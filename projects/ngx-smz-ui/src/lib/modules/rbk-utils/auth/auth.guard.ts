import { Injectable, Injector, ReflectiveInjector, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { ToastActions } from '../state/global/application/application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store, private config: NgxRbkUtilsConfig) {
    }

    public async canActivate(snapshot: ActivatedRouteSnapshot): Promise<boolean> {
        if (this.config.debugMode) console.groupCollapsed(`RbkAuthGuard on route /${snapshot.routeConfig.path}`);

        let isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

        let hasAccess = false;

        if (!isAuthenticated) {
            try {
                if (this.config.debugMode) console.log('[RbkAuthGuard] User not authenticated, trying to login from localstorage...');

                await this.store.dispatch(new AuthenticationActions.LocalLogin()).toPromise();

                isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);
            }
            catch (ex) {
                if (this.config.debugMode) console.log('[RbkAuthGuard] Error while trying to authenticate the user: ', ex);
            }
        }

        if (isAuthenticated) {
            if (this.config.debugMode) console.log('[RbkAuthGuard] User is authenticated, trying to determine if route needs special claim');

            const routeData = snapshot.routeConfig.data;

            if (routeData != null && routeData.claim != null) {
                if (this.config.debugMode) console.log('[RbkAuthGuard] The selected route needs this claim: ', routeData.claim);

                const allowedClaim = routeData.claim as string;
                hasAccess = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(allowedClaim));

                const domain = (this.store.selectSnapshot(AuthenticationSelectors.userdata) as any).domain;
                if (!hasAccess && domain != null && domain !== '') {
                    hasAccess = this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(`${domain}|${allowedClaim}`));
                }
            }
            else {
                if (this.config.debugMode) console.log('[RbkAuthGuard] The selected route does not need special claims');

                hasAccess = true;
            }
        }

        if (isAuthenticated && !hasAccess) {
            this.store.dispatch(new Navigate([this.config.routes.authenticatedRoot]));
            this.store.dispatch(new ToastActions.Warning('Você não possui autorização para acessar esta rota. Redirecionando para ' + this.config.routes.authenticatedRoot));
        }

        if (!isAuthenticated) {
            if (this.config.debugMode) console.log('[RbkAuthGuard] Could not login locally using localstorage, redirecting user to landing page');

            this.store.dispatch(new Navigate([this.config.routes.nonAuthenticatedRoot]));
            // this.store.dispatch(new ToastActions.Error('Usuário não autenticado, redirecionando para ' + this.config.routes.nonAuthenticatedRoot));
        }

        if (this.config.debugMode) console.log('[RbkAuthGuard] Does the user can access this route? -> ', hasAccess);
        if (this.config.debugMode) console.groupEnd();

        return hasAccess;
    }
}
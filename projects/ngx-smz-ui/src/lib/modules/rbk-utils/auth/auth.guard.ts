import { Injectable, Injector, ReflectiveInjector, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';
import { ToastActions } from '../../../state/global/application/application.actions.toast';
import { Navigate } from '@ngxs/router-plugin';
import { firstValueFrom } from 'rxjs';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({ providedIn: 'root' })
export class RbkAuthGuard implements CanActivate {
    constructor(private store: Store) {
    }

    public async canActivate(snapshot: ActivatedRouteSnapshot): Promise<boolean> {
        if (GlobalInjector.config.debugMode) console.groupCollapsed(`RbkAuthGuard on route /${snapshot.routeConfig.path}`);

        let isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);

        let hasAccess = false;

        if (!isAuthenticated) {
            try {
                if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] User not authenticated, trying to login from localstorage...');

                await firstValueFrom(this.store.dispatch(new AuthenticationActions.LocalLogin()));

                isAuthenticated = this.store.selectSnapshot(AuthenticationSelectors.isAuthenticated);
            }
            catch (ex) {
                if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] Error while trying to authenticate the user: ', ex);
            }
        }

        if (isAuthenticated) {
            if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] User is authenticated, trying to determine if route needs special claim');

            const routeData = snapshot.routeConfig.data;

            if (routeData != null && routeData.claim != null) {
                if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] The selected route needs this claim: ', routeData.claim);

                const allowedClaim = routeData.claim as string;
                const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

                hasAccess = this.store.selectSnapshot(validationSelectors.hasClaimAccess(allowedClaim));

            }
            else {
                if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] The selected route does not need special claims');

                hasAccess = true;
            }
        }

        if (isAuthenticated && !hasAccess) {
            this.store.dispatch(new Navigate([GlobalInjector.config.rbkUtils.authentication.authenticatedRoot]));
            this.store.dispatch(new ToastActions.Warning('Você não possui autorização para acessar esta rota. Redirecionando para ' + GlobalInjector.config.rbkUtils.authentication.authenticatedRoot));
        }

        if (!isAuthenticated) {
            if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] Could not login locally using localstorage, redirecting user to landing page');

            this.store.dispatch(new Navigate([GlobalInjector.config.rbkUtils.authentication.nonAuthenticatedRoot]));
            // this.store.dispatch(new ToastActions.Error('Usuário não autenticado, redirecionando para ' + GlobalInjector.config.authentication.nonAuthenticatedRoot));
        }

        if (GlobalInjector.config.debugMode) console.log('[RbkAuthGuard] Does the user can access this route? -> ', hasAccess);
        if (GlobalInjector.config.debugMode) console.groupEnd();

        return hasAccess;
    }
}
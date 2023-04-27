import { Injectable } from '@angular/core';
import { Store, State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from './authentication.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../modules/rbk-utils/auth/auth.service';
import { isEmpty } from '../../../modules/rbk-utils/utils/utils';
import { LoginResponse } from '../../../modules/rbk-utils/auth/models';
import { generateUserData } from './authentication.utils';
import { GlobalActions } from '../global.actions';
import { FeaturesActions } from '../../features/features.actions';
import { DatabaseActions } from '../../database/database.actions';
import { GlobalInjector } from '../../../common/services/global-injector';
import { BaseUserData } from '../../../modules/smz-access/models/base-user-data';
import { AuthenticationService } from '../../../modules/smz-access/services/authentication.service';
import { JwtResponse } from '../../../modules/smz-access/models/jwt-response';

// If access token path or property name is changed, don't forget to update the
// selectSnapshot to it on BaseApiService
export interface AuthenticationStateModel<T> {
    userdata: T;
    refreshToken: string | null;
    accessToken: string | null;
}

export const getAuthenticationInitialState = (): AuthenticationStateModel<any> => ({
    userdata: null,
    refreshToken: null,
    accessToken: null,
});

// Do not remove the @dynamic flag, it's not a comment, it an Angular flag!
// @dynamic
@State<AuthenticationStateModel<any>>({
    name: 'authentication',
    defaults: getAuthenticationInitialState()
})
@Injectable()
export class AuthenticationState {
    constructor(private authService: AuthService, private authenticationService: AuthenticationService, private store: Store) { }

    @Action(AuthenticationActions.LocalLogin)
    public localLogin(ctx: StateContext<AuthenticationStateModel<any>>, action: AuthenticationActions.LocalLogin): void {
        if (GlobalInjector.config.debugMode) console.log(`[Authentication State] Handling LocalLogin`);
        const accessToken = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_access_token');
        const refreshToken = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_refresh_token');

        if (isEmpty(accessToken)) {
            ctx.dispatch(new AuthenticationActions.LocalLoginFailure());
        }
        else {

            const userdata = generateUserData(accessToken) as BaseUserData;

            if (userdata.hasTenant && userdata.tenant != null) {
                localStorage.setItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant', userdata.tenant);
            }

            ctx.patchState({
                userdata,
                refreshToken,
                accessToken,
            });

            ctx.dispatch(new AuthenticationActions.LocalLoginSuccess());
        }
    }

    @Action(AuthenticationActions.LocalLoginFailure)
    public localLoginFailure(ctx: StateContext<AuthenticationStateModel<any>>, action: AuthenticationActions.LocalLoginFailure): void {
    }

    @Action(AuthenticationActions.RemoteLogin)
    public remoteLogin(ctx: StateContext<AuthenticationStateModel<any>>, action: AuthenticationActions.RemoteLogin): Observable<LoginResponse> {
        return this.authService.login(action.data.username, action.data.password, action.data.extraProperties).pipe(
            tap((result: LoginResponse) => {

                if (result.redirect == null) {
                    this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
                }
                else if (GlobalInjector.config.rbkUtils.authentication.login.redirectCallback != null) {
                    GlobalInjector.config.rbkUtils.authentication.login.redirectCallback(result);
                }
                else {
                    throw console.error('Rbk Config redirectCallback not defined.');
                }
            })
        );
    }

    @Action([AuthenticationActions.RemoteLoginSuccess, AuthenticationActions.RefreshTokenSuccess])
    public remoteLoginSuccess(ctx: StateContext<AuthenticationStateModel<any>>,
        action: AuthenticationActions.RemoteLoginSuccess | AuthenticationActions.RefreshTokenSuccess): void {
        if (GlobalInjector.config.debugMode) console.log(`[Authentication State] Handling RemoteLoginSuccess/RefreshTokenSuccess`);
        localStorage.setItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_access_token', action.accessToken);
        localStorage.setItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_refresh_token', action.refreshToken);

        const userdata = generateUserData(action.accessToken) as BaseUserData;

        if (userdata.hasTenant && userdata.tenant != null) {
            localStorage.setItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant', userdata.tenant);
        }

        ctx.patchState({
            userdata,
            refreshToken: action.refreshToken,
            accessToken: action.accessToken,
        });
    }

    @Action(AuthenticationActions.LocalLoginSuccess)
    public localLoginSuccess(ctx: StateContext<AuthenticationStateModel<any>>, action: AuthenticationActions.LocalLoginSuccess): void {
        if (GlobalInjector.config.debugMode) console.log(`[Authentication State] Handling LocalLoginSuccess`);
    }

    @Action(AuthenticationActions.Logout)
    public logout(ctx: StateContext<AuthenticationStateModel<any>>): void {
        localStorage.removeItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_access_token');
        localStorage.removeItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_refresh_token');

        ctx.dispatch(new GlobalActions.Restore());
        ctx.dispatch(new DatabaseActions.Restore());
        ctx.dispatch(new FeaturesActions.Restore());
    }

    @Action(AuthenticationActions.SwitchTenant)
    public onSwitchTenant(ctx: StateContext<AuthenticationStateModel<any>>, action: AuthenticationActions.SwitchTenant): Observable<JwtResponse> {
        if (GlobalInjector.config.debugMode) console.log(`[Authentication State] Handling SwitchTenant`);

        return this.authenticationService.switchTenant(action.data).pipe(
            tap((result: JwtResponse) => {
                this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
                window.location.href = '';
            })
        );
    }
}
import { Injectable } from '@angular/core';
import { Store, State, Action, StateContext } from '@ngxs/store';
import { AuthenticationActions } from './authentication.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../modules/rbk-utils/auth/auth.service';
import { isEmpty } from '../../../modules/rbk-utils/utils/utils';
import { LoginResponse } from '../../../modules/rbk-utils/auth/models';
import { NgxRbkUtilsConfig } from '../../../modules/rbk-utils/ngx-rbk-utils.config';
import { generateUserData } from './authentication.utils';
import { GlobalActions } from '../global.actions';
import { FeaturesActions } from '../../features/features.actions';
import { DatabaseActions } from '../../database/database.actions';

// If access token path or property name is changed, don't forget to update the
// selectSnapshot to it on BaseApiService
export interface AuthenticationStateModel {
    userdata: any;
    refreshToken: string | null;
    accessToken: string | null;
}

export const getAuthenticationInitialState = (): AuthenticationStateModel => ({
    userdata: null,
    refreshToken: null,
    accessToken: null,
});

// Do not remove the @dynamic flag, it's not a comment, it an Angular flag!
// @dynamic
@State<AuthenticationStateModel>({
    name: 'authentication',
    defaults: getAuthenticationInitialState()
})
@Injectable()
export class AuthenticationState {
    constructor(private authService: AuthService, private store: Store, private rbkConfig: NgxRbkUtilsConfig) { }

    @Action(AuthenticationActions.LocalLogin)
    public localLogin(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLogin): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling LocalLogin`);
        const accessToken = localStorage.getItem(this.rbkConfig.authentication.localStoragePrefix + '_access_token');
        const refreshToken = localStorage.getItem(this.rbkConfig.authentication.localStoragePrefix + '_refresh_token');

        if (isEmpty(accessToken)) {
            ctx.dispatch(new AuthenticationActions.LocalLoginFailure());
        }
        else {
            ctx.patchState({
                userdata: generateUserData(accessToken, this.rbkConfig),
                refreshToken,
                accessToken,
            });

            ctx.dispatch(new AuthenticationActions.LocalLoginSuccess());
        }
    }

    @Action(AuthenticationActions.LocalLoginFailure)
    public localLoginFailure(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLoginFailure): void {
    }

    @Action(AuthenticationActions.RemoteLogin)
    public remoteLogin(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.RemoteLogin): Observable<LoginResponse> {
        return this.authService.login(action.username, action.password, action.extraProperties).pipe(
            tap((result: LoginResponse) => {

                if (result.redirect == null) {
                    this.store.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
                }
                else if (this.rbkConfig.authentication.login.redirectCallback != null) {
                    this.rbkConfig.authentication.login.redirectCallback(result);
                }
                else {
                    throw console.error('Rbk Config redirectCallback not defined.');
                }
            })
        );
    }

    @Action([AuthenticationActions.RemoteLoginSuccess, AuthenticationActions.RefreshTokenSuccess])
    public remoteLoginSuccess(ctx: StateContext<AuthenticationStateModel>,
        action: AuthenticationActions.RemoteLoginSuccess | AuthenticationActions.RefreshTokenSuccess): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling RemoteLoginSuccess/RefreshTokenSuccess`);
        localStorage.setItem(this.rbkConfig.authentication.localStoragePrefix + '_access_token', action.accessToken);
        localStorage.setItem(this.rbkConfig.authentication.localStoragePrefix + '_refresh_token', action.refreshToken);

        ctx.patchState({
            userdata: generateUserData(action.accessToken, this.rbkConfig),
            refreshToken: action.refreshToken,
            accessToken: action.accessToken,
        });
    }

    @Action(AuthenticationActions.LocalLoginSuccess)
    public localLoginSuccess(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.LocalLoginSuccess): void {
        if (this.rbkConfig.debugMode) console.log(`[Authentication State] Handling LocalLoginSuccess`);
    }

    @Action(AuthenticationActions.Logout)
    public logout(ctx: StateContext<AuthenticationStateModel>): void {
        localStorage.removeItem(this.rbkConfig.authentication.localStoragePrefix + '_access_token');
        localStorage.removeItem(this.rbkConfig.authentication.localStoragePrefix + '_refresh_token');

        ctx.dispatch(new GlobalActions.Restore());
        ctx.dispatch(new DatabaseActions.Restore());
        ctx.dispatch(new FeaturesActions.Restore());
    }
}
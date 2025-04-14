import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationActions, LoginResponse } from 'ngx-smz-ui';
import { SsoAuthActions } from './sso-auth.actions';
import { SsoAuthService } from '../sso-auth.service';

export const SSO_AUTH_STATE_NAME = 'ssoAuth';

export interface SsoAuthStateModel {}

export const getSsoAuthInitialState = (): SsoAuthStateModel => ({});

@State<SsoAuthStateModel>({
  name: SSO_AUTH_STATE_NAME,
  defaults: getSsoAuthInitialState()
})

@Injectable()
export class SsoAuthState {
  constructor(private apiService: SsoAuthService) { }

  @Action(SsoAuthActions.SsoSessionLogin)
  public onSsoSessionLogin$(ctx: StateContext<SsoAuthStateModel>, action: SsoAuthActions.SsoSessionLogin): Observable<LoginResponse> {
    return this.apiService.login(action.data).pipe(
      tap((result: LoginResponse) => {
        ctx.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
      })
    );
  }

  @Action(SsoAuthActions.UsernameLogin)
  public onUsernameLogin$(ctx: StateContext<SsoAuthStateModel>, action: SsoAuthActions.UsernameLogin): Observable<LoginResponse> {
    return this.apiService.login(action.data).pipe(
      tap((result: LoginResponse) => {
        ctx.dispatch(new AuthenticationActions.RemoteLoginSuccess(result.accessToken, result.refreshToken));
      })
    );
  }

}

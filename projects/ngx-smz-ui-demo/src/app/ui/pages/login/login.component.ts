import { Component } from '@angular/core';
import { SmzLoginBuilder, SmzLoginState, SmzFormBuilder } from 'ngx-smz-ui';
import { AuthenticationActions } from 'ngx-smz-ui';
import { environment } from '@environments/environment';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public state: SmzLoginState<LoginData, LoginData> = this.buildState();

  public buildState(): SmzLoginState<LoginData, LoginData> {

    return new SmzLoginBuilder<LoginData, LoginData>()
      .setMessage('Entre com as suas credenciais')
      .setExtraInfo(`(${environment.version}) Software`)
      .setSubmitCallback(() => { console.log('SubmitCallback'); })
      // .setLogoSize('large')
      .useCustomLogo('assets/mountains.png')
      .setPayloadCallback((response: any) => ({ username: response.username, password: response.password }))
      .setLoginAction(AuthenticationActions.RemoteLogin)
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<LoginData>()
          .enableSubmitOnEnter()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .text('username', 'Usuário')
              .validators().required().input
              .group
            .password('password', 'Senha')
              .validators().required().input
              .group
            // .addPasswordConfirmation('password', 'Confirme a Senha')
            //   .validators().required()
            //   .group
            .form
          .build()
      )
      .build();

  }

}
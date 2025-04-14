import { Component } from '@angular/core';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';
import { SmzLoginState } from '../../features/login/login-state';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { nameof, SimpleEntity } from '../../../../common/models/simple-named-entity';
import { LoginPayload } from '../../../rbk-utils/auth/auth.service';
import { Store } from '@ngxs/store';
import { SmzFormBuilder } from '../../../../builders/smz-forms/form-builder';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';

interface LoginData {
  tenant?: SimpleEntity<string>;
  username: string;
  password: string;
}

@Component({
    selector: 'smz-ui-superuser-login-page',
    templateUrl: './superuser-login.component.html',
    standalone: false
})
export class SuperuserLoginComponent {

  public state: SmzLoginState<unknown, unknown> = this.buildState();

  constructor(private store: Store) {
  }

  public buildState(): SmzLoginState<unknown, unknown> {

    const config = GlobalInjector.config.rbkUtils.authentication;

    const state = new SmzLoginBuilder<LoginData, LoginPayload>()
    .setMessage('Entre com suas credenciais')
    .setLogoType('horizontal')
    .setLogoSize('large')
    .setBackground('bg-black')
    .setPayloadCallback((response: LoginData) => {

      let extraProperties: { [name: string]: string } = { };

      if (config.refreshToken?.extraProperties != null) {
        // Adicionar propriedades extras definidas no startup do projeto
        extraProperties = config.refreshToken.extraProperties;
      }

      if (config.allowSuperuser && response.username == config.login.superuser) {
        // Superuser login
      }

      return { username: response.username, password: response.password, extraProperties };

    })
    .setLoginAction(AuthenticationActions.RemoteLogin)
    .setLogoutAction(AuthenticationActions.Logout, GlobalInjector.config.rbkUtils.authentication.login.superuserRoute)
    .setForm(
      new SmzFormBuilder<LoginData>()
        .enableSubmitOnEnter()
        .disableFlattenResponse()
        .group()
          .setLayout('EXTRA_SMALL', 'col-12')
          .text(nameof<LoginData>('username'), 'Usuário Adminstrativo')
            .validators().required().input
            .group
          .password(nameof<LoginData>('password'), 'Senha')
            .validators().required().input
            .group
        .form
        .build()
    )
    .setExtraInfo('<em>Autenticação Adminstrativa</em>')
    .build();

    return { ...state, ...config.login.page.overrideState };

  }

}
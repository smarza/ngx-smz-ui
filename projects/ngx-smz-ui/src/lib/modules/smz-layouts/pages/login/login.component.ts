import { Component } from '@angular/core';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';
import { SmzLoginState } from '../../features/login/login-state';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-ui-login-page',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public state: SmzLoginState<unknown, unknown> = this.buildState();

  constructor() {

  }

  public buildState(): SmzLoginState<unknown, unknown> {

    return new SmzLoginBuilder()
      .setMessage('Entre com as suas credenciais')
      .setPayloadCallback((response: any) => ({ username: response.username, password: response.password, extraProperties: GlobalInjector.config.rbkUtils.authentication?.refreshToken?.extraProperties }))
      .build();

  }

}
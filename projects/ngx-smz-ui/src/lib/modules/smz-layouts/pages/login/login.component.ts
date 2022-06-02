import { Component } from '@angular/core';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';
import { SmzLoginState } from '../../features/login/login-state';

@Component({
  selector: 'smz-ui-login-page',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public state: SmzLoginState<unknown, unknown> = this.buildState();

  constructor(public readonly config: SmzLayoutsConfig, public rbkConfig: NgxRbkUtilsConfig) {

  }

  public buildState(): SmzLoginState<unknown, unknown> {

    return new SmzLoginBuilder()
      .setPayloadCallback((response: any) => ({ username: response.username, password: response.password, extraProperties: { applicationId: this.rbkConfig.authentication?.refreshToken?.extraProperties?.applicationId, domain: 'BUZIOS' } }))
      .build();

  }

}
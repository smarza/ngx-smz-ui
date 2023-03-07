import { Component } from '@angular/core';
import { LoginPayload, SmzFormBuilder, SmzLoginBuilder, SmzLoginState, nameof, TenantsSelectors, SimpleEntity, GlobalInjector, compareInsensitive } from 'ngx-smz-ui';
import { AuthenticationActions } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';

interface LoginData {
  tenant: SimpleEntity<string>;
  username: string;
  password: string;
}

@Component({
  selector: 'app-development-login',
  template: `<smz-ui-login [state]="state"></smz-ui-login>`,
})
export class DevelopmentLoginComponent {
  public state: SmzLoginState<LoginData, LoginPayload>;

  constructor(private store: Store) {
    if (GlobalInjector.config.rbkUtils.authentication.login.showTenantSelector) {
      this.state = this.forUserWithTenant();
    }
    else {
      this.state = this.buildState();
    }
  }

  public buildState(): SmzLoginState<LoginData, LoginPayload> {

    const config = GlobalInjector.config.rbkUtils;

    return new SmzLoginBuilder<LoginData, LoginPayload>()
      .setMessage('DEVELOPMENT LOGIN')
      .setLogoType('horizontal')
      .setLogoSize('large')
      .setBackground('bg-[#1e293b]')
      .setPayloadCallback((response: LoginData) => {

        if (response.username === config.authentication.login.superuser) {
          return { username: response.username, password: response.password, extraProperties: {} };
        }

        if (config.authentication.useTenant) {
          return { username: response.username, password: response.password, extraProperties: { tenant: config.authentication.login.tenant } };
        }

        return { username: response.username, password: response.password, extraProperties: {} };

      })
      .setLoginAction(AuthenticationActions.RemoteLogin)
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<LoginData>()
          .enableSubmitOnEnter()
          .disableFlattenResponse()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .text(nameof<LoginData>('username'), 'Usuário')
              .validators().required()
              .group
            .password(nameof<LoginData>('password'), 'Senha')
              .validators().required()
              .group
          .form
          .build()
      )
      .build();
  }

  public forUserWithTenant(): SmzLoginState<LoginData, LoginPayload> {

    const tenants = this.store
      .selectSnapshot(TenantsSelectors.all)
      .map(x => ({ id: x.alias, name: x.name }));

    const tenant = tenants.find(x => compareInsensitive(x.id, GlobalInjector.config.rbkUtils.authentication.login.tenant));

    return new SmzLoginBuilder<LoginData, LoginPayload>()
      .setMessage('DEVELOPMENT LOGIN')
      .setLogoType('horizontal')
      .setLogoSize('large')
      .setBackground('bg-[#1e293b]')
      .setPayloadCallback((response: LoginData) => ({ username: response.username, password: response.password, extraProperties: { tenant: response.tenant.id } }))
      .setLoginAction(AuthenticationActions.RemoteLogin)
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<LoginData>()
          .enableSubmitOnEnter()
          .disableFlattenResponse()
          .group()
          .setLayout('EXTRA_SMALL', 'col-12')
          .dropdown('tenant', 'Domínios', tenants, tenant.id)
          .validators().required()
          .group
          .text(nameof<LoginData>('username'), 'Usuário')
          .validators().required()
          .group
          .password(nameof<LoginData>('password'), 'Senha')
          .validators().required()
          .group
          .form
          .build()
      )
      .build();

  }
}

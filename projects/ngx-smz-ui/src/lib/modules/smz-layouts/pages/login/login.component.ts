import { Component } from '@angular/core';
import { SmzLoginBuilder } from '../../../../builders/smz-login/state-builder';
import { SmzLoginState } from '../../features/login/login-state';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { nameof, SimpleEntity } from '../../../../common/models/simple-named-entity';
import { LoginPayload } from '../../../rbk-utils/auth/auth.service';
import { Store } from '@ngxs/store';
import { TenantsSelectors } from '../../../smz-access/state/tenants/tenants.selectors';
import { SmzFormBuilder } from '../../../../builders/smz-forms/form-builder';
import { isEmpty } from '../../../rbk-utils/utils/utils';
import { compareInsensitive, getFirst } from '../../../../common/utils/utils';
import { AuthenticationActions } from '../../../../state/global/authentication/authentication.actions';
import { environment } from '@environments/environment';
import { SmzTextPattern } from '../../../smz-forms/public-api';

interface LoginData {
  tenant?: SimpleEntity<string>;
  username: string;
  password: string;
}

@Component({
  selector: 'smz-ui-login-page',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public state: SmzLoginState<unknown, unknown> = this.buildState();

  constructor(private store: Store) {
  }

  public buildState(): SmzLoginState<unknown, unknown> {

    const config = GlobalInjector.config;
    const authConfig = GlobalInjector.config.rbkUtils.authentication;
    const tenants = authConfig.login.showTenantSelector ? this.getTenants() : [];

    const localTenant = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant');
    const defaultTenant = localTenant ?? getFirst(tenants)?.id;

    const state = new SmzLoginBuilder<LoginData, LoginPayload>()
      .setMessage('Entre com suas credenciais')
      .setLogoType('horizontal')
      .setLogoSize('large')
      .setBackground('bg-[#1e293b]')
      .setPayloadCallback((response: LoginData) => {

        let extraProperties: { [name: string]: string } = { };

        if (authConfig.refreshToken?.extraProperties != null) {
          // Adicionar propriedades extras definidas no startup do projeto
          extraProperties = authConfig.refreshToken.extraProperties;
        }

        if (authConfig.allowSuperuser && response.username == authConfig.login.superuser) {
          // Superuser login
        }
        else if (authConfig.useSingleTenantAplication) {
          // Aplicação configurada para único Tenant
          extraProperties.tenant = authConfig.login.applicationTenant;
        }
        else if (authConfig.login.showTenantSelector) {
          // Adicionar Tenant escolhido pelo usuário no seletor de Tenants
          extraProperties.tenant = response.tenant.id;
        }

        return { username: response.username, password: response.password, extraProperties };

      })
      .setLoginAction(AuthenticationActions.RemoteLogin)
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<LoginData>()
          .enableSubmitOnEnter()
          .disableFlattenResponse()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .if(authConfig.login.showTenantSelector)
              .dropdown('tenant', config.locale.authorization.tenant.displayName, tenants, defaultTenant)
                .validators().required().input
                .group
            .endIf
          .if(authConfig.useWindowsAuthentication && !environment.production)
            .text(nameof<LoginData>('username'), 'Credencial de Desenvolvimento')
              .setSaveFormat(authConfig.login.forceLowercaseUsername ? SmzTextPattern.LOWERCASE : SmzTextPattern.NONE)
              .validators().required().input
              .group
            .endIf
          .if(!authConfig.useWindowsAuthentication)
            .text(nameof<LoginData>('username'), 'Usuário')
              .setSaveFormat(authConfig.login.forceLowercaseUsername ? SmzTextPattern.LOWERCASE : SmzTextPattern.NONE)
              .validators().required().input
              .group
            .password(nameof<LoginData>('password'), 'Senha')
              .validators().required().input
              .group
            .endIf
          .form
          .build()
      )
      .setExtraInfo(authConfig.useWindowsAuthentication ? '<em>Autenticação do Windows</em>' : '')
      .build();

      if (config.rbkUtils.authentication.login.page.customButtons != null) {
        state.customButtons = [...config.rbkUtils.authentication.login.page.customButtons];
      }

    return { ...state, ...authConfig.login.page.overrideState };

  }

  private getTenants(): SimpleEntity<string>[] {
    const tenants = this.store
      .selectSnapshot(TenantsSelectors.all)
      .map(x => ({ id: x.alias, name: x.name }));

    return tenants;
  }

  private checkApplicationTenant(): void {

    const tenants = this.store.selectSnapshot(TenantsSelectors.all);
    const configTentant = GlobalInjector.config.rbkUtils.authentication.login.applicationTenant;
    const tenant = tenants.find(x => compareInsensitive(x.alias, configTentant));

    if (!isEmpty(configTentant) && tenant == null) {
      throw new Error(`The tenant '${configTentant.toUpperCase()}' set on the project configuration was not found on the database (${tenants.map(x => x.alias).join(', ').toUpperCase()}).`);
    }
  }

}
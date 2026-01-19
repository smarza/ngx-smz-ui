import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationActions, GlobalInjector, NgxSmzFormsModule, SimpleEntity, SmzFormBuilder, SmzLoginBuilder, SmzLoginModule, SmzLoginState, SmzTextPattern, TenantsSelectors, getFirst, nameof } from '@ngx-smz/core';
import { CommonModule, Location } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NavigateToExternalSsoUrl } from '../sso-redirect-function';
import { ActivatedRoute } from '@angular/router';
import { SsoSessionLoginPayload, UsernameLoginPayload } from '../sso-login-payload';
import { SsoAuthActions } from '../states/sso-auth.actions';
import { SsoLoginEnviroment, ssoEnvironment } from '../sso.environment';
import { environment } from '@environments/environment';

interface SsoSessionLoginData {
  tenant?: SimpleEntity<string>;
}

interface UsernameLoginData {
  tenant: SimpleEntity<string>;
  username: string;
}

@Component({
  standalone: true,
  selector: 'sso-login-page',
  template: '<smz-ui-login *ngIf="state != null" [state]="state"></smz-ui-login>',
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    NgxSmzFormsModule,
    SmzLoginModule
  ]
})
export class SsoLoginPageComponent {

  public state: SmzLoginState<unknown, unknown>;
  public isSuccesfulRedirect = false;
  public config: SsoLoginEnviroment = environment.production ? ssoEnvironment.production : ssoEnvironment.development;

  constructor(private store: Store, private route: ActivatedRoute, private location: Location) {
    if (this.config.enableCASettings) {
      this.setupSuccesfulRedirectListener();
    }
    else {
      this.buildUsernameLoginState();
    }
  }

  public buildSsoSessionLoginState(tenant: string): void {

    const config = GlobalInjector.config;
    const authConfig = GlobalInjector.config.rbkUtils.authentication;
    const tenants = authConfig.login.showTenantSelector ? this.getTenants() : [];

    const localTenant = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant');
    const defaultTenant = tenant ?? (localTenant ?? getFirst(tenants)?.id);

    this.state = new SmzLoginBuilder<SsoSessionLoginData, SsoSessionLoginPayload>()
      .setMessage('Entre com suas credenciais')
      .useCustomLogo('assets/images/logos/horizontal-light.svg')
      .setBackground('bg-primary-color')
      .setLoginButtonLabel('LOGIN PETROBRAS')
      .setPayloadCallback((response: SsoSessionLoginData) => {
        NavigateToExternalSsoUrl(response.tenant.id);
        return null;
      })
      .disableLoginActionCall()
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<SsoSessionLoginData>()
          .enableSubmitOnEnter()
          .disableFlattenResponse()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .dropdown(nameof<SsoSessionLoginData>('tenant'), config.locale.authorization.tenant.displayName, tenants, defaultTenant)
              .validators().required().input
              .group
          .form
          .build()
      )
      .setExtraInfo('<em>Controle de Acesso V4</em>')
      .build();
  }

  public buildUsernameLoginState(): void {

    const config = GlobalInjector.config;
    const authConfig = GlobalInjector.config.rbkUtils.authentication;
    const tenants = authConfig.login.showTenantSelector ? this.getTenants() : [];

    const localTenant = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant');
    const defaultTenant = localTenant ?? getFirst(tenants)?.id;

    this.state = new SmzLoginBuilder<UsernameLoginData, UsernameLoginPayload>()
      .setMessage('Entre com suas credenciais')
      .useCustomLogo('assets/images/logos/horizontal-light.svg')
      .setBackground('bg-primary-color')
      .setPayloadCallback(response => {
        return { tenant: response?.tenant?.id, username: response?.username };
      })
      .setLoginButtonLabel('LOGIN')
      .setLoginAction(SsoAuthActions.UsernameLogin)
      .setLogoutAction(AuthenticationActions.Logout)
      .setForm(
        new SmzFormBuilder<UsernameLoginData>()
          .enableSubmitOnEnter()
          .disableFlattenResponse()
          .group()
            .setLayout('EXTRA_SMALL', 'col-12')
            .dropdown(nameof<UsernameLoginData>('tenant'), config.locale.authorization.tenant.displayName, tenants, defaultTenant)
              .validators().required().input
              .group
            .text(nameof<UsernameLoginData>('username'), 'Credencial de Desenvolvimento', 'bk9x')
              .setSaveFormat(authConfig.login.forceLowercaseUsername ? SmzTextPattern.LOWERCASE : SmzTextPattern.NONE)
              .validators().required().input
              .group
            .form
          .build()
      )
      .setExtraInfo('<em>Ambiente de Desenvolvimento</em>')
      .build();
  }

  private getTenants(): SimpleEntity<string>[] {
    const tenants = this.store
      .selectSnapshot(TenantsSelectors.all)
      .map(x => ({ id: x.alias, name: x.name }));

    return tenants;
  }


  private setupSuccesfulRedirectListener(): void {

    this.route.queryParamMap
      .subscribe(params => {
        const globalSessionId = params.get('globalSessionId');
        const tenant = params.get('tenant');

        if (globalSessionId != null && tenant != null) {
          this.isSuccesfulRedirect = true;
          this.removeQueryParams();
          setTimeout(() => {
            this.signInWithSsoSession(tenant, globalSessionId);
          }, 0);
        }

        this.buildSsoSessionLoginState(tenant);
      });

  }

  private signInWithSsoSession(tenant: string, sessionToken: string): void {
    const payload: SsoSessionLoginPayload = { tenant: tenant, sessionToken };
    this.store.dispatch(new SsoAuthActions.SsoSessionLogin(payload));
  }

  private removeQueryParams(): void {
    const path = this.location.path().split('?')[0];
    this.location.replaceState(path);
  }

}
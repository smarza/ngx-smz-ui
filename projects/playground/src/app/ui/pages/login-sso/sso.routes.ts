import { Route } from '@angular/router';
import { RbkDatabaseStateGuard, TENANTS_STATE_NAME } from '@ngx-smz/core';
import { SsoLoginPageComponent } from './components/sso-login-page.component';

export const SSO_LOGIN_PATH = 'login-sso';

export const SsoRoutes: Route[] = [
  {
    path: SSO_LOGIN_PATH,
    canActivate: [RbkDatabaseStateGuard],
    data: {
      layout: { mode: 'none', contentPadding: '0em' },
      requiredStates: [TENANTS_STATE_NAME]
    },
    component: SsoLoginPageComponent
  }
];
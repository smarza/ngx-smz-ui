import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RbkAccessControlModule } from '../../../rbk-utils/auth/guards/access-control.module';
import { RbkDatabaseStateGuard } from '../../../rbk-utils/utils/state/database-state.guard';
import { NgxSmzTablesModule } from '../../../smz-tables/ngx-smz-tables.module';
import { CLAIMS_STATE_NAME } from '../../state/claims/claims.state';
import { ROLES_STATE_NAME } from '../../state/roles/roles.state';
import { USERS_STATE_NAME } from '../../state/users/users.state';
import { UsersPageComponent } from './containers/users/users-page.component';
import { PickListModule } from 'primeng/picklist';
import { RbkAuthGuard } from '../../../rbk-utils/auth/auth.guard';
import { GlobalInjector } from '../../../../common/services/global-injector';

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkDatabaseStateGuard],
    component: UsersPageComponent,
    data: {
      layout: {
        mode: 'full'
      },
      title: '',
      appArea: '',
      clearReusableRoutes: true,
      requiredStates: [USERS_STATE_NAME, ROLES_STATE_NAME, CLAIMS_STATE_NAME]
    }
  },
];

export const routerModuleForChildUsersModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [UsersPageComponent],
  imports: [
    CommonModule,
    routerModuleForChildUsersModule,
    ButtonModule,
    NgxSmzTablesModule,
    RbkAccessControlModule,
    PickListModule
  ],
  exports: []
})
export class UsersModule
{
  constructor() {

    if (GlobalInjector.config.rbkUtils.authorization.users?.httpBehavior?.authentication) routes[0].canActivate.push(RbkAuthGuard);
    if (GlobalInjector.config.rbkUtils.authorization.users?.router?.claim) routes[0].data.claim = GlobalInjector.config.rbkUtils.authorization.users.router.claim;

    if (GlobalInjector.config.rbkUtils.authorization.users.title == null) {
      throw Error('You need to specify the users title on gedi configuration.');
    }

    routes[0].data.title = GlobalInjector.config.rbkUtils.authorization.users.title;

  }
}

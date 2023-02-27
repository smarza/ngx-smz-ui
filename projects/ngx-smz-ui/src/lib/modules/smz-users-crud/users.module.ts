import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
// import { CLAIMS_STATE_NAME } from '../../state/database/claims/claims.state';
// import { ROLES_STATE_NAME } from '../../state/database/roles/roles.state';
import { USERS_STATE_NAME } from '../../state/database/users/users.state';

import { UsersPageComponent } from './containers/users/users-page.component';
import { PickListModule } from 'primeng/picklist';
import { RbkDatabaseStateGuard } from '../rbk-utils/utils/state/database-state.guard';
import { NgxSmzTablesModule } from '../smz-tables/ngx-smz-tables.module';
import { RbkAccessControlModule } from '../rbk-utils/auth/guards/access-control.module';
import { NgxRbkUtilsConfig } from '../rbk-utils/ngx-rbk-utils.config';
import { RbkAuthGuard } from '../rbk-utils/auth/auth.guard';

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
      requiredStates: [USERS_STATE_NAME] //, ROLES_STATE_NAME, CLAIMS_STATE_NAME]
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
  constructor(private config: NgxRbkUtilsConfig) {

    if (config.cruds.users?.httpBehavior?.authentication) routes[0].canActivate.push(RbkAuthGuard);
    if (config.cruds.users?.router?.claim) routes[0].data.claim = config.cruds.users.router.claim;

    if (config.cruds.users.title == null) {
      throw Error('You need to specify the users title on gedi configuration.');
    }

    routes[0].data.title = config.cruds.users.title;

  }
}

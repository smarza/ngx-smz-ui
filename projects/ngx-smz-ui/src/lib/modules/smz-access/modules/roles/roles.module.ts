import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RolesPageComponent } from './features/roles-page/roles-page.component';
import { ROLES_STATE_NAME } from '../../state/roles/roles.state';
import { CLAIMS_STATE_NAME } from '../../state/claims/claims.state';
import { SmzRouteData } from '../../../smz-layouts/core/models/route-layout-data';
import { RbkAuthGuard } from '../../../rbk-utils/auth/auth.guard';
import { RbkDatabaseStateGuard } from '../../../rbk-utils/utils/state/database-state.guard';
import { NgxSmzTablesModule } from '../../../smz-tables/ngx-smz-tables.module';
import { NgxSmzDataPipesModule } from '../../../../common/data-pipes/data-pipes.module';
import { NgPipesModule } from 'ngx-pipes';
import { NgVarModule } from '../../../../common/directives/ng-var/ng-var.module';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '2em'
  },
  title: 'Regras de Acesso',
  appArea: 'Roles',
  clearReusableRoutes: true,
  requiredStates: [ROLES_STATE_NAME, CLAIMS_STATE_NAME]
};

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: RolesPageComponent,
        data
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSmzTablesModule,
    NgxSmzDataPipesModule,
    NgPipesModule,
    NgVarModule,
    ButtonModule
  ],
  exports: [],
  declarations: [
    RolesPageComponent
  ],
  providers: [

  ],
})
export class RolesModule { }
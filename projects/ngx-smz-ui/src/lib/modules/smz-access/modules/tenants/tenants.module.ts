import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TenantsPageComponent } from './features/tenants-page/tenants-page.component';
import { SmzRouteData } from '../../../smz-layouts/core/models/route-layout-data';
import { TENANTS_STATE_NAME } from '../../state/tenants/tenants.state';
import { RbkAuthGuard } from '../../../rbk-utils/auth/auth.guard';
import { RbkDatabaseStateGuard } from '../../../rbk-utils/utils/state/database-state.guard';
import { NgxSmzDataPipesModule } from '../../../../common/data-pipes/data-pipes.module';
import { NgxSmzTablesModule } from '../../../smz-tables/ngx-smz-tables.module';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '2em'
  },
  title: 'Tenants',
  appArea: 'Tenants',
  clearReusableRoutes: true,
  requiredStates: [TENANTS_STATE_NAME]
};

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: TenantsPageComponent,
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
    ButtonModule
  ],
  exports: [],
  declarations: [
    TenantsPageComponent
  ],
  providers: [

  ],
})
export class TenantsModule { }
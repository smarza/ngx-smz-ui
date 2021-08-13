import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME } from 'ngx-rbk-utils';
import { NgxSmzTablesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CountriesDbName } from '@states/database/countries/countries.state';
import { DemoComplexTableComponent } from './demo-complex-table/demo-complex-table.component';
import { DemoPrimeComponent } from './demo-prime/demo-prime.component';
import { DemoTablesComponent } from './demo-tables/demo-tables.components';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Demo Tables',
  appArea: 'demo-table',
  clearReusableRoutes: true,
  requiredStates: [UI_DEFINITIONS_STATE_NAME, CountriesDbName]
};

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Compras'
    },
    children: [
      {
        path: '',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: DemoTablesComponent,
        data
      },
      {
        path: 'prime',
        canActivate: [RbkAuthGuard],
        component: DemoPrimeComponent,
        data
      },
      {
        path: 'complex',
        canActivate: [RbkAuthGuard],
        component: DemoComplexTableComponent,
        data
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzTablesModule,
    TableModule
  ],
  exports: [],
  declarations: [
    DemoTablesComponent,
    DemoPrimeComponent,
    DemoComplexTableComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemoTablesModule { }

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { NgxSmzTablesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DemoPrimeComponent } from './demo-prime/demo-prime.component';
import { DemoTablesComponent } from './demo-tables.components';

const data: SmzRouteData = {
  layout: {
    mode: 'menu-only',
  },
  title: 'Demo Tables',
  appArea: 'demo-table',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard],
    component: DemoTablesComponent,
    data
  },
  {
    path: 'prime',
    canActivate: [RbkAuthGuard],
    component: DemoPrimeComponent,
    data
  },
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
    DemoPrimeComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DemoTablesModule { }

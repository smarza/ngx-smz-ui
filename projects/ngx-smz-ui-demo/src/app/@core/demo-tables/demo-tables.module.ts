import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { NgxSmzTablesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { DemoTablesComponent } from './demo-tables.components';

const data: SmzRouteData = {
  layout: {
    mode: 'layout'
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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzTablesModule
  ],
  exports: [],
  declarations: [
    DemoTablesComponent
  ],
  providers: [],
})
export class DemoTablesModule { }

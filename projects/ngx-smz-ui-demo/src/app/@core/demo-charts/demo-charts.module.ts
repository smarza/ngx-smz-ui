import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbkAuthGuard } from 'ngx-rbk-utils';
import { NgxSmzTreesModule, SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SmzChartModule } from 'ngx-smz-ui';
import { DemoChartsComponent } from './demo-charts.components';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Demo Chart',
  appArea: 'demo-chart',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DemoChartsComponent,
    data
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    SmzChartModule
  ],
  exports: [],
  declarations: [
    DemoChartsComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DemoChartsModule { }
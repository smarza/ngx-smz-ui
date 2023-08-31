import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgxSmzFormsModule } from '../../../smz-forms/smz-forms.module';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { DiagnosticsDataCollectComponent } from './diagnostics-data-collect.component';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Diagnóstico',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DiagnosticsDataCollectComponent,
    data
  },
];

export const routerModuleForChildDiagnosticsDataCollectModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [DiagnosticsDataCollectComponent],
  imports: [
    CommonModule,
    routerModuleForChildDiagnosticsDataCollectModule,
    ButtonModule,
    NgxSmzFormsModule,
  ],
  exports: []
})
export class DiagnosticsDataCollectModule { }

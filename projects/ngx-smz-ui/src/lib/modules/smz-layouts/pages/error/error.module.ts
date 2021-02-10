import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmzFormsModule } from 'ngx-smz-dialogs';
import { ButtonModule } from 'primeng/button';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { ErrorComponent } from './error.component';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Erro',
  appArea: 'error',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: ErrorComponent,
    data
  },
];

export const routerModuleForChildErrorModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    routerModuleForChildErrorModule,
    ButtonModule,
    NgxSmzFormsModule,
  ],
  exports: []
})
export class ErrorModule { }

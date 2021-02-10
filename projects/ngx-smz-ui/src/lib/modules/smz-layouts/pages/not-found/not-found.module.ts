import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSmzFormsModule } from 'ngx-smz-dialogs';
import { ButtonModule } from 'primeng/button';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { NotFoundComponent } from './not-found.component';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Rota não encontrada',
  appArea: 'not-found',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: NotFoundComponent,
    data
  },
];

export const routerModuleForChildNotFoundModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    routerModuleForChildNotFoundModule,
    ButtonModule,
    NgxSmzFormsModule,
  ],
  exports: []
})
export class NotFoundModule { }

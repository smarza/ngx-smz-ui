import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgxSmzFormsModule } from '../../../smz-forms/smz-forms.module';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { SmzLoginModule } from '../../features/login/login.module';
import { SuperuserLoginComponent } from './superuser-login.component';
import { RbkDatabaseStateGuard } from '../../../rbk-utils/utils/state/database-state.guard';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Login',
  appArea: 'login',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkDatabaseStateGuard],
    component: SuperuserLoginComponent,
    data
  },
];

export const routerModuleForChildSuperuserLoginModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [SuperuserLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    routerModuleForChildSuperuserLoginModule,
    ButtonModule,
    NgxSmzFormsModule,
    SmzLoginModule
  ],
  exports: [
    SuperuserLoginComponent,
    SharedModule
  ]
})
export class SuperuserLoginModule { }
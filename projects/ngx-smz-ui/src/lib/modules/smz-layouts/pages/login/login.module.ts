import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NgxSmzFormsModule } from '../../../smz-forms/smz-forms.module';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { SmzLoginModule } from '../../features/login/login.module';
import { LoginComponent } from './login.component';
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
    component: LoginComponent,
    data
  },
];

export const routerModuleForChildLoginModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    routerModuleForChildLoginModule,
    ButtonModule,
    NgxSmzFormsModule,
    SmzLoginModule
  ],
  exports: [
    LoginComponent,
    SharedModule
  ]
})
export class LoginModule { }
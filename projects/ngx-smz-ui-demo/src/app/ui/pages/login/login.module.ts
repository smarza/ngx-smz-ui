import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmzLoginModule } from 'ngx-smz-ui';
import { SmzRouteData } from 'ngx-smz-ui';
import { LoginComponent } from './login.component';

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
    canActivate: [],
    component: LoginComponent,
    data
  },
];

export const routerModuleForChildLoginModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    routerModuleForChildLoginModule,
    SmzLoginModule
  ],
  exports: []
})
export class LoginModule { }

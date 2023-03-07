import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@environments/environment';
import { RbkDatabaseStateGuard, SmzLoginModule, TENANTS_STATE_NAME } from 'ngx-smz-ui';
import { SmzRouteData } from 'ngx-smz-ui';
import { DevelopmentLoginComponent } from './development-login.component';
import { ProductionLoginComponent } from './production-login.component';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Login',
  appArea: 'login',
  clearReusableRoutes: true,
  requiredStates: [TENANTS_STATE_NAME]
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkDatabaseStateGuard],
    component: !environment.production ? DevelopmentLoginComponent : ProductionLoginComponent,
    data
  },
];

export const routerModuleForChildLoginModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [DevelopmentLoginComponent, ProductionLoginComponent],
  imports: [
    CommonModule,
    routerModuleForChildLoginModule,
    SmzLoginModule
  ],
  exports: []
})
export class LoginModule { }

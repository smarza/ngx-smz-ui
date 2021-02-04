import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SmzRouteData } from '../../core/models/route-layout-data';
import { LoginComponent } from './login.component';

const data: SmzRouteData = {
  layout: {
    mode: 'single'
  },
  title: 'Login',
  appArea: 'login',
  clearReusableRoutes: true
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: LoginComponent,
    data
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule
  ],
  exports: []
})
export class LoginModule { }

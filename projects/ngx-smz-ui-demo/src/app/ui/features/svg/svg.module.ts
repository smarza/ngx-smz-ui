import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmzRouteData, SmzSvgModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard } from 'ngx-smz-ui';
import { SvgComponent } from './svg.component';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '0'
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: SvgComponent,
    data
  },
];

@NgModule({
  declarations: [SvgComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    SmzSvgModule,
  ],
  providers: [],
  bootstrap: [SvgComponent]
})
export class SvgModule { }

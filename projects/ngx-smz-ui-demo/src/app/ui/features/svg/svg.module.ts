import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmzRouteData, SmzSvgModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard } from 'ngx-smz-ui';
import { SvgComponent } from './demo/svg.component';
import { SvgPlaygroundComponent } from './playground/svg-playground.component';
import { SvgGcabComponent } from './gcab/svg-gcab.component';

const routes: Routes = [
  {
    path: 'demo',
    // canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: SvgComponent,
    data: {
      layout: {
        mode: 'full',
        contentPadding: '0'
      },
      title: 'Home',
      appArea: 'home',
      clearReusableRoutes: true,
      requiredStates: []
    }
  },
  {
    path: 'playground',
    // canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: SvgPlaygroundComponent,
    data: {
      layout: {
        mode: 'full',
        contentPadding: '30px'
      },
      title: 'Home',
      appArea: 'home',
      clearReusableRoutes: true,
      requiredStates: []
    }
  },
  {
    path: 'gcab',
    // canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: SvgGcabComponent,
    data: {
      layout: {
        mode: 'full',
        contentPadding: '30px'
      },
      title: 'Home',
      appArea: 'home',
      clearReusableRoutes: true,
      requiredStates: []
    }
  },
];

@NgModule({
  declarations: [SvgComponent, SvgPlaygroundComponent, SvgGcabComponent],
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

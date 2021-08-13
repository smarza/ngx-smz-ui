import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'none'
  },
  title: 'Landing',
  appArea: 'landing',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: LandingComponent,
    data
  },
];

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ButtonModule
  ],
  providers: [],
  bootstrap: [LandingComponent]
})
export class LandingModule { }

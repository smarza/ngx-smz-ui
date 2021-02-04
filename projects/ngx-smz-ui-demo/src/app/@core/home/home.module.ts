import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SmzRouteData } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';

const data: SmzRouteData = {
  layout: {
    mode: 'layout'
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: HomeComponent,
    data
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ButtonModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { SmzRouteData } from 'ngx-smz-ui';

const data: SmzRouteData = {
  layout: {
    mode: 'full'
  },
  title: 'Details',
  appArea: 'details',
  clearReusableRoutes: true
};

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DetailsComponent,
    data
  },
];

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [DetailsComponent]
})
export class DetailsModule { }

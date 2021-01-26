import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: LandingComponent,
    data: {},
  },
];

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [LandingComponent]
})
export class LandingModule { }

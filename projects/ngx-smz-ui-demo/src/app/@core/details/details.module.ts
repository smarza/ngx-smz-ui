import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: DetailsComponent,
    data: {},
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

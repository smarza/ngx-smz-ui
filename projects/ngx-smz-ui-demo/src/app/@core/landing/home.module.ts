import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/landing/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: HomeComponent,
    data: {},
  },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }

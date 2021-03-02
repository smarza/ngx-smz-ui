import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./@core/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'details',
    loadChildren: () => import('./@core/details/details.module').then(m => m.DetailsModule),
  },
  {
    path: 'tables',
    loadChildren: () => import('./@core/demo-tables/demo-tables.module').then(m => m.DemoTablesModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('./@core/landing/landing.module').then(m => m.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

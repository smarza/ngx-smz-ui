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
    path: 'trees',
    loadChildren: () => import('./@core/demo-trees/demo-trees.module').then(m => m.DemoTreesModule),
  },
  {
    path: 'ng-dom',
    loadChildren: () => import('./@core/demo-ng-dom/demo-ng-dom.module').then(m => m.DemoNgDomModule),
  },
  {
    path: 'faqs',
    loadChildren: () => import('./@core/demo-faqs/demo-faqs.module').then(m => m.DemoFaqsModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('./@core/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'side-content',
    loadChildren: () => import('./@core/side-content/side-content.module').then(m => m.SideContentModule),
  },
  {
    path: 'tag-area',
    loadChildren: () => import('./@core/tag-area/tag-area-demo.module').then(m => m.TagAreaDemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

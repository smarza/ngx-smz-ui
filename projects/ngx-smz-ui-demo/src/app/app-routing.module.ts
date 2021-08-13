import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HOME_PATH } from '@routes';
import { DemoNestedLayout1Component } from './@core/demo-nested-routes/demo-nested-layout-1.component';
import { DemoNestedLayout2Component } from './@core/demo-nested-routes/demo-nested-layout-2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME_PATH,
    pathMatch: 'full',
  },
  {
    path: HOME_PATH,
    loadChildren: () => import('./ui/features/home/home.module').then(m => m.HomeModule),
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
    path: 'editable-table',
    loadChildren: () => import('./@core/demo-editable-table/demo-editable-table.module').then(m => m.DemoEditableTableModule),
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
    path: 'charts',
    loadChildren: () => import('./@core/demo-charts/demo-charts.module').then(m => m.DemoChartsModule),
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
  {
    path: 'nested',
    loadChildren: () => import('./@core/demo-nested-routes/demo-nested-routes.module').then(m => m.DemoNestedRoutesModule),
  },
  {
    path: 'resolvers',
    loadChildren: () => import('./@core/demo-resolvers/demo-resolvers.module').then(m => m.DemoResolversRoutesModule),
  },
  {
    path: '',
    component: DemoNestedLayout1Component,
    canActivate: [],
    data: {
      layout: {
        mode: 'full',
        contentPadding: '2em'
      },
    },
    children: [
      {
        path: '',
        component: DemoNestedLayout2Component,
        canActivate: [],
        children: [
          {
            path: 'nested-routes',
            loadChildren: () => import('./@core/demo-ng-dom/demo-ng-dom.module').then(m => m.DemoNgDomModule),
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

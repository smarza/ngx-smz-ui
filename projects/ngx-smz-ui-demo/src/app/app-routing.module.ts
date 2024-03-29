import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HOME_PATH, SIGNALR_PATH, SVG_PATH } from '@routes';
import { DemoNestedLayout1Component } from '@features/demo-nested-routes/demo-nested-layout-1.component';
import { DemoNestedLayout2Component } from '@features/demo-nested-routes/demo-nested-layout-2.component';
import { LoginModule } from './ui/pages/login/login.module';
import { LOGIN_PAGE_PATH } from '../routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME_PATH,
    pathMatch: 'full',
  },
  { path: LOGIN_PAGE_PATH, loadChildren: () => LoginModule },
  {
    path: HOME_PATH,
    loadChildren: () => import('./ui/features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: SIGNALR_PATH,
    loadChildren: () => import('./ui/features/signalr/signalr.module').then(m => m.SignalRModule),
  },
  {
    path: SVG_PATH,
    loadChildren: () => import('./ui/features/svg/svg.module').then(m => m.SvgModule),
  },
  {
    path: 'details',
    loadChildren: () => import('@features/details/details.module').then(m => m.DetailsModule),
  },
  {
    path: 'tables',
    loadChildren: () => import('@features/demo-tables/demo-tables.module').then(m => m.DemoTablesModule),
  },
  {
    path: 'editable-table',
    loadChildren: () => import('@features/demo-editable-table/demo-editable-table.module').then(m => m.DemoEditableTableModule),
  },
  {
    path: 'trees',
    loadChildren: () => import('@features/demo-trees/demo-trees.module').then(m => m.DemoTreesModule),
  },
  {
    path: 'tree-with-details',
    loadChildren: () => import('@features/demo-tree-with-details/demo-tree-with-details.module').then(m => m.DemoTreeWithDetailsModule),
  },
  {
    path: 'ng-dom',
    loadChildren: () => import('@features/demo-ng-dom/demo-ng-dom.module').then(m => m.DemoNgDomModule),
  },
  {
    path: 'charts',
    loadChildren: () => import('./ui/features/demo-charts/demo-charts.module').then(m => m.DemoChartsModule),
  },
  {
    path: 'faqs',
    loadChildren: () => import('@features/demo-faqs/demo-faqs.module').then(m => m.DemoFaqsModule),
  },
  {
    path: 'landing',
    loadChildren: () => import('@features/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'side-content',
    loadChildren: () => import('@features/side-content/side-content.module').then(m => m.SideContentModule),
  },
  {
    path: 'tag-area',
    loadChildren: () => import('@features/tag-area/tag-area-demo.module').then(m => m.TagAreaDemoModule),
  },
  {
    path: 'signals',
    loadChildren: () => import('@features/signals/signals-demo.module').then(m => m.SignalsDemoModule),
  },
  {
    path: 'resolvers',
    loadChildren: () => import('@features/demo-resolvers/demo-resolvers.module').then(m => m.DemoResolversRoutesModule),
  },
  {
    path: '',
    component: DemoNestedLayout1Component,
    canActivate: [],
    data: {
      layout: {
        mode: 'full',
        contentPadding: '0'
      },
    },
    children: [
      {
        path: 'nested',
        loadChildren: () => import('@features/demo-nested-routes/demo-nested-routes.module').then(m => m.DemoNestedRoutesModule),
      },
      {
        path: '',
        component: DemoNestedLayout2Component,
        canActivate: [],
        children: [
          {
            path: 'nested-routes',
            loadChildren: () => import('@features/demo-ng-dom/demo-ng-dom.module').then(m => m.DemoNgDomModule),
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

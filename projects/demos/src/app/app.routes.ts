import { Routes } from '@angular/router';
import { DemosLayoutComponent } from './layout/demos-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: DemosLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'chart',
        loadComponent: () =>
          import('./pages/demos/chart/chart-demo.component').then((m) => m.ChartDemoComponent),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./pages/demos/forms/forms-demo.component').then((m) => m.FormsDemoComponent),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./pages/demos/table/table-demo.component').then((m) => m.TableDemoComponent),
      },
      {
        path: 'dialogs',
        loadComponent: () =>
          import('./pages/demos/dialog/dialog-demo.component').then((m) => m.DialogDemoComponent),
      },
      {
        path: 'tree',
        loadComponent: () =>
          import('./pages/demos/tree/tree-demo.component').then((m) => m.TreeDemoComponent),
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('./pages/demos/cards/cards-demo.component').then((m) => m.CardsDemoComponent),
      },
      {
        path: 'timeline',
        loadComponent: () =>
          import('./pages/demos/timeline/timeline-demo.component').then((m) => m.TimelineDemoComponent),
      },
      {
        path: 'gauge',
        loadComponent: () =>
          import('./pages/demos/gauge/gauge-demo.component').then((m) => m.GaugeDemoComponent),
      },
      {
        path: 'multi-tables',
        loadComponent: () =>
          import('./pages/demos/multi-tables/multi-tables-demo.component').then((m) => m.MultiTablesDemoComponent),
      },
      {
        path: 'document',
        loadComponent: () =>
          import('./pages/demos/document/document-demo.component').then((m) => m.DocumentDemoComponent),
      },
    ],
  },
];

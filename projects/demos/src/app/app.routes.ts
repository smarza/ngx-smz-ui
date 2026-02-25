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
    ],
  },
];

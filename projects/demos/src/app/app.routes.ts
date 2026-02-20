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
    ],
  },
];

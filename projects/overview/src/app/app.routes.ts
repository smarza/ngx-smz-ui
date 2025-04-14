import { Routes } from '@angular/router';
import { HOME_PATH } from '../routes';
import { SsoRoutes } from './ui/features/home/login-sso/sso.routes';

export const routes: Routes = [
  ...SsoRoutes, // SSO Customization
  {
    path: '',
    data: {
      smzUiRoot: true,
    },
    children: [
      { path: '', redirectTo: HOME_PATH, pathMatch: 'full' },
      {
        path: HOME_PATH,
        loadChildren: () => import('./ui/features/home/home.module').then(m => m.HomeModule),
      },
    ]
  },
];

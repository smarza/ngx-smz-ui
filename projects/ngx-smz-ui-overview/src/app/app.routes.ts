import { Routes } from '@angular/router';
import { SsoRoutes } from '@features/home/login-sso/sso.routes';
import { HOME_PATH } from '@routes';

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

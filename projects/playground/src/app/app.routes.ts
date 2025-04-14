import { Routes } from '@angular/router';
import { AppLayout, NotfoundPageComponent, AccessPageComponent, ErrorPageComponent } from '@ngx-smz/layout';
import { HomePageComponent } from './ui/pages/home-page.component';
import { AtivoLoginPageComponent } from './ui/pages/login-sso/components/ativo-login-page.component';
export const routes: Routes = [
  {
    path: '',
    data: {
      smzUiRoot: true,
    },
    children: [
      {
        path: '',
        component: AppLayout,
        data: {
          smzUiRoot: true,
        },
        children: [
          { path: '', component: HomePageComponent },
        ]
      },
      { path: 'notfound', component: NotfoundPageComponent },
      { path: 'access', component: AccessPageComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'login', component: AtivoLoginPageComponent },
    ]
  },
  { path: '**', redirectTo: '/notfound' }
];

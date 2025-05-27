import { Routes } from '@angular/router';
import { AppLayout, NotfoundPageComponent, AccessPageComponent, ErrorPageComponent } from '@ngx-smz/layout';
import { HomePageComponent } from './ui/pages/home-page.component';
import { AtivoLoginPageComponent } from './ui/pages/login-sso/components/ativo-login-page.component';
import { Page1Component } from './ui/pages/page-1.component';
import { Page2Component } from './ui/pages/page-2.component';
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
          { path: 'home', component: HomePageComponent, data: { title: 'Home' } },
          { path: 'page-1', component: Page1Component, data: { title: 'Page 1' } },
          { path: 'page-2', component: Page2Component, data: {} },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
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

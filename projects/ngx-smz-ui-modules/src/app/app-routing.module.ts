import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH } from '@routes';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME } from 'ngx-smz-ui';
import { HomeModule } from './ui/features/home/home.module';

const routes: Routes = [
  { path: '', canActivate: [RbkAuthGuard, RbkDatabaseStateGuard], data: {requiredStates: [UI_DEFINITIONS_STATE_NAME]}, children: [
    { path: HOME_PATH, loadChildren: (): Promise<HomeModule> => import('./ui/features/home/home.module').then(m => m.HomeModule) },
  ]},
  { path: '', redirectTo: HOME_PATH, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

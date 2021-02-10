import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorModule } from './pages/error/error.module';
import { LoginModule } from './pages/login/login.module';
import { NotFoundModule } from './pages/not-found/not-found.module';

export function getLoginModule() { return LoginModule }
export function getErrorModule() { return ErrorModule }
export function getNotFoundModule() { return NotFoundModule }

const routes: Routes = [
  { path: 'login', loadChildren: getLoginModule },
  { path: 'error', loadChildren: getErrorModule },
  { path: 'notfound', loadChildren: getNotFoundModule },
  { path: '**', redirectTo: 'notfound' },
];

export const routerModuleForRootNgxSmzLayoutsModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [routerModuleForRootNgxSmzLayoutsModule],
  exports: [RouterModule]
})
export class NgxSmzLayoutsRoutingModule { }

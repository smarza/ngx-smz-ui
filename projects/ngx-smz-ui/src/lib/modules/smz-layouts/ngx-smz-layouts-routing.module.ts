import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './features/login/login.module';

export function getApplicationsModule()
{
  return LoginModule;
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: getApplicationsModule,
  }
];

export const routerModuleForRootNgxSmzLayoutsModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [routerModuleForRootNgxSmzLayoutsModule],
  exports: [RouterModule]
})
export class NgxSmzLayoutsRoutingModule { }

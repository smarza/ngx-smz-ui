import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './features/app-layout/app-layout.component';
import { AppLayoutModule } from './features/app-layout/app-layout.module';
import { LoginModule } from './features/login/login.module';
import { OutletComponent } from './features/outlet/outlet.component';

export function getApplicationsModule()
{
  return LoginModule;
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: getApplicationsModule,
  },
  // {
  //   path: '',
  //   component: AppLayoutComponent,
  //   children: [
  //     { path: 'outlet', component: OutletComponent },
  //   ]
  // },
];

@NgModule({
  imports: [AppLayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NgxSmzLayoutsRoutingModule { }

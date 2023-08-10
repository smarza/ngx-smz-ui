import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH } from '@routes';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

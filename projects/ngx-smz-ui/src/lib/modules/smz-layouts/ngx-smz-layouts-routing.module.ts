import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, Router } from '@angular/router';
import { NgxRbkUtilsConfig } from '../rbk-utils/ngx-rbk-utils.config';
import { UsersModule } from '../smz-access/modules/users/users.module';
import { MenuHelperService } from './core/services/menu-helper-service';
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

export const routerModuleForRootNgxSmzLayoutsModule = RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' });

@NgModule({
  imports: [routerModuleForRootNgxSmzLayoutsModule],
  exports: [RouterModule]
})
export class NgxSmzLayoutsRoutingModule {

  constructor(private router: Router, private readonly config: NgxRbkUtilsConfig, public menuService: MenuHelperService)
  {
    const newRoutes = [];

    if (newRoutes.length > 0) {


      const gediRoot = getRouteRoot(this.router.config);

      if (gediRoot != null) {

        if (gediRoot.children === null) gediRoot.children = [];

        // publicar rotas dentro da rota com filhos.
        gediRoot.children.push(...newRoutes);
        this.router.resetConfig([...this.router.config]);
      }
      else {
        // publicar rotas na raiz.
        this.router.resetConfig([...newRoutes, ...this.router.config ]);
      }

    }

  }

}

function getRouteRoot(routes: Routes): Route {

  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];

    if (route.data?.gediRoot === true) {
      return route;
    }
    else if (route.children?.length > 0) {
      const root = getRouteRoot(route.children);

      if (root) {
        return root;
      }
    }

  }

  return null;
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, Router } from '@angular/router';
import { MenuHelperService } from './core/services/menu-helper-service';
import { ErrorModule } from './pages/error/error.module';
import { LoginModule } from './pages/login/login.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { GlobalInjector } from '../../common/services/global-injector';
export function getLoginModule() { return LoginModule }
export function getErrorModule() { return ErrorModule }
export function getNotFoundModule() { return NotFoundModule }

const routes: Routes = [
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

  constructor(private router: Router, public menuService: MenuHelperService)
  {
    const newRoutes = [];

    const uiConfig = GlobalInjector.config;

    if (uiConfig.rbkUtils.authentication.login.page.useSmzLoginModule) {
      newRoutes.push({ path: uiConfig.rbkUtils.authentication.login.route, loadChildren: getLoginModule });
    }

    if (newRoutes.length > 0) {
      this.router.resetConfig([...newRoutes, ...this.router.config ]);
    }

    console.log(this.router.config);
  }

}

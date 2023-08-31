import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, Router } from '@angular/router';
import { MenuHelperService } from './core/services/menu-helper-service';
import { ErrorModule } from './pages/error/error.module';
import { LoginModule } from './pages/login/login.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { GlobalInjector } from '../../common/services/global-injector';
import { SuperuserLoginModule } from './pages/superuser-login/superuser-login.module';
import { DiagnosticsDataCollectModule } from './pages/diagnostics-data-collect/diagnostics-data-collect.module';
export function getLoginModule() { return LoginModule }
export function getSuperuserLoginModule() { return SuperuserLoginModule }
export function getErrorModule() { return ErrorModule }
export function getNotFoundModule() { return NotFoundModule }
export function getDiagnosticsDataCollectModule() { return DiagnosticsDataCollectModule }

const routes: Routes = [
  { path: 'error', loadChildren: getErrorModule },
  { path: 'diagnostics-data-collect', loadChildren: getDiagnosticsDataCollectModule },
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

    if (uiConfig.rbkUtils.authentication.allowSuperuser) {
      newRoutes.push({ path: uiConfig.rbkUtils.authentication.login.superuserRoute, loadChildren: getSuperuserLoginModule });
    }

    if (newRoutes.length > 0) {
      this.router.resetConfig([...newRoutes, ...this.router.config ]);
    }
  }

}

import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideSmzUILayout } from '@ngx-smz/layout';
import { NgxsModule } from '@ngxs/store';
import { buildState, NgxSmzUiModule } from '@ngx-smz/core';
import { UiBuilder } from '../../../overview/src/globals/smz-ui-config-builder';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { environment } from '@environments/environment';

import { appSidebar } from './layout/app.sidebar';
import { appFooter } from './layout/app.footer';
import { appTopbar } from './layout/app.topbar';
import { appLayout } from './layout/app.layout';
import { appLayoutState } from './layout/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    importProvidersFrom(
      [
        // Não alterar a ordem desse grupo
        NgxSmzUiModule.forRoot(UiBuilder),

        NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
        NgxsRouterPluginModule.forRoot(),
      ]),
    provideSmzUILayout({
      sidebar: appSidebar,
      footer: appFooter,
      topbar: appTopbar,
      layout: appLayout,
      state: appLayoutState
    }),
  ]
};

import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideSmzUILayout, SMZ_UI_LAYOUT_CONFIG } from '@ngx-smz/layout';
import { NgxsModule } from '@ngxs/store';
import { buildState, NgxSmzUiModule, provideSmzCoreLogging } from '@ngx-smz/core';
import { UiBuilder } from './globais/smz-ui-config-builder';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { environment } from '@environments/environment';
import { provideSmzLayoutLogging } from '@ngx-smz/layout';
import { appSidebar } from './layout/app.sidebar';
import { appFooter } from './layout/app.footer';
import { appTopbar } from './layout/app.topbar';
import { appLayout } from './layout/app.layout';
import { appLayoutState } from './layout/app.state';
import { appLoggingCore, appLoggingLayout } from './layout/app.logging';

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
    provideSmzCoreLogging(() => [{ logging: appLoggingCore }]),
    provideSmzLayoutLogging(() => [{ logging: appLoggingLayout }]),
    provideSmzUILayout(() => [
      {
        sidebar: appSidebar,
        footer: appFooter,
        topbar: appTopbar,
        layout: appLayout,
        state: appLayoutState
      }
    ]),
    provideAppInitializer(async () => {
      const config = inject(SMZ_UI_LAYOUT_CONFIG);
      config.hasClaim = (claims: string[]) => true;
    })
  ]
};

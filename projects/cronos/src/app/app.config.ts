import { ApplicationConfig, LOCALE_ID, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection, signal } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import ptBr from '@angular/common/locales/pt';
import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import { NgxSmzUiModule, buildState, LayoutUiActions, provideSmzEnvironment, PrimeConfigService, AuthenticationActions, AccessControlService, provideSmzCoreLogging } from '@ngx-smz/core';
import { UiBuilder } from './global/smz-ui-config-builder';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { environment } from '@environments/environment';
import { provideSmzLayoutLogging, provideSmzUILayout, SMZ_UI_LAYOUT_CONFIG } from '@ngx-smz/layout';
import { appSidebar } from './layout/app.sidebar';
import { appFooter } from './layout/app.footer';
import { appTopbar } from './layout/app.topbar';
import { appLayoutState } from './layout/app.state';
import { appLayout } from './layout/app.layout';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { CronosPreset } from './layout/app.theme';
import { appLoggingCore, appLoggingLayout } from './layout/app.logging';

registerLocaleData(ptBr);
moment.locale('pt-br');

export const appConfig: ApplicationConfig = {
  providers: [
    provideSmzEnvironment({
      serverUrl: environment.serverUrl,
      authenticationApi: environment.authenticationApi,
      baseHref: environment.baseHref,
      production: environment.production
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: CronosPreset, options: { darkModeSelector: '.app-dark' } } }),
    importProvidersFrom(
      [
        // Não alterar a ordem desse grupo
        NgxSmzUiModule.forRoot(UiBuilder),

        NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
        NgxsRouterPluginModule.forRoot(),
      ]
    ),
    { provide: LOCALE_ID, useFactory: (): string => 'pt-BR' },
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
      const store = inject(Store);

      store.dispatch(new LayoutUiActions.Initialize());
      inject(PrimeConfigService).init();

      const profile = {
        icon: signal('fa-solid fa-user'),
        avatar: undefined,
        placeholder: 'avatar-placeholder.png',
        label: 'Perfil do Usuário',
        menuItems: [
          {
            label: 'Deslogar',
            icon: 'fa-solid fa-right-from-bracket',
            command: () => {
              store.dispatch(new AuthenticationActions.Logout(null));
            }
          }
        ]
      };

      const config = inject(SMZ_UI_LAYOUT_CONFIG);

      // Atualização do perfil do usuário na barra de navegação
      config.topbar.update((state) => ({ ...state, features: [profile] }));

      // Injeção do serviço de controle de acesso para que o layout possa usar
      const accessControlService = inject(AccessControlService);
      config.hasClaim = (claims: string[]) => accessControlService.hasClaim(claims);
    })
  ],
};

import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from '@ngxs/store';
import { NgxSmzUiModule, buildState, provideSmzCoreLogging } from '@ngx-smz/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { routes } from './app.routes';
import { UiBuilder } from './globals/smz-ui-config-builder';
import { provideSmzLayoutLogging } from '@ngx-smz/layout';
import { appLoggingCore, appLoggingLayout } from './layout/app.logging';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      },
    }),
    provideSmzCoreLogging(() => [{ logging: appLoggingCore }]),
    provideSmzLayoutLogging(() => [{ logging: appLoggingLayout }]),
    importProvidersFrom(
      NgxSmzUiModule.forRoot(UiBuilder),
      NgxsModule.forRoot(buildState(), { developmentMode: true })
    ),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
        },
      },
    },
  ],
};

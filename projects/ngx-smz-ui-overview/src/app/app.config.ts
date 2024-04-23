import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import ptBr from '@angular/common/locales/pt';
import moment from 'moment';
import { registerLocaleData } from '@angular/common';
import { HephaestusProviderModule, NewAthenaProviderModule, NgxSmzUiModule, buildState } from 'ngx-smz-ui';
import { UiBuilder } from '../globals/smz-ui-config-builder';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '@environments/environment';
import { smzAthenaConfig } from '../globals/smz-layouts.config';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

registerLocaleData(ptBr);
moment.locale('pt-br');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      [
        // Não alterar a ordem desse grupo
        NgxSmzUiModule.forRoot(UiBuilder),

        NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),

        NewAthenaProviderModule.forRoot(smzAthenaConfig),
      ]
    ),
    { provide: LOCALE_ID, useFactory: (): string => 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'pt' },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
        }
      }
    },
  ],
};

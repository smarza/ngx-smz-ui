import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HephaestusLayoutModule, HephaestusProviderModule, NewAthenaLayoutModule, NewAthenaProviderModule, NgxSmzUiModule } from 'ngx-smz-ui';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { CommonModule, registerLocaleData } from '@angular/common';
import { ApplicationActions, buildState } from 'ngx-smz-ui';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import ptBr from '@angular/common/locales/pt';
import moment from 'moment';
import { environment } from '@environments/environment';
import { UiBuilder } from '../globals/smz-ui-config-builder';
import { VarejoUiBuilder } from '../globals/varejo-smz-ui-config-builder';
import { smzAthenaConfig, smzHephaestusConfig } from '../globals/deprecated/smz-layouts.config';

registerLocaleData(ptBr);
moment.locale('pt-br');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    // Não alterar a ordem desse grupo
    // NgxSmzUiModule.forRoot(VarejoUiBuilder),
    NgxSmzUiModule.forRoot(UiBuilder),

    NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // NewAthenaProviderModule.forRoot(smzAthenaConfig),
    // NewAthenaLayoutModule,

    HephaestusProviderModule.forRoot(smzHephaestusConfig),
    HephaestusLayoutModule,

    HighlightModule
  ],
  providers: [
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
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'pt'
    },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store) {
    this.store.dispatch(new ApplicationActions.NgRxInitialized());

    this.store.dispatch(new ApplicationActions.SetLogInfo({
      applicationArea: '',
      applicationLayer: 'Angular Client',
      applicationVersion: environment.version,
      extraData: ''
    }));
  }
}

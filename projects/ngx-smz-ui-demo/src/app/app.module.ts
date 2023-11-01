import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSmzLayoutsModule, NgxSmzFaqsModule, NgxSmzDialogsModule, HephaestusLayoutModule, NgxSmzUiBlockModule, NgxSmzUiModule, HephaestusProviderModule } from 'ngx-smz-ui';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { CommonModule } from '@angular/common';
import { ApplicationActions, buildState } from 'ngx-smz-ui';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { UiBuilder } from '../globals/smz-ui-config-builder';
import { smzFaqsConfig } from '../globals/deprecated/smz-faqs.config';
import { smzHephaestusConfig } from '../globals/deprecated/smz-layouts.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    // Não alterar a ordem desse grupo
    NgxSmzUiModule.forRoot(UiBuilder),

    NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    HephaestusProviderModule.forRoot(smzHephaestusConfig),
    HephaestusLayoutModule,

    // NewAthenaLayoutModule.forRoot(smzAthenaConfig),
    NgxSmzFaqsModule.forRoot(smzFaqsConfig),
    HighlightModule,
    NgxSmzUiBlockModule
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
    }
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

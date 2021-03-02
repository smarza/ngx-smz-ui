import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSmzLayoutsModule, HephaestusLayoutModule, AthenaLayoutModule } from 'ngx-smz-ui';

import { smzAthenaConfig, smzHephaestusConfig, smzLayoutsConfig } from '../globals/smz-layouts.config';
import { CommonModule } from '@angular/common';
import { NgxSmzDialogsModule } from 'ngx-smz-dialogs';
import { ApplicationActions, buildState, NgxRbkUtilsConfig, NgxRbkUtilsModule } from 'ngx-rbk-utils';
import { NgxsModule, Store } from '@ngxs/store';
import { environment } from '../environments/environment';
import { rbkConfig } from '../globals/rbk-config';
import { smzDialogsConfig } from '../globals/smz-config';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    // Não alterar a ordem desse grupo
    NgxSmzDialogsModule.forRoot(smzDialogsConfig),
    NgxRbkUtilsModule.forRoot(rbkConfig),
    NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxSmzLayoutsModule.forRoot(smzLayoutsConfig),

    HephaestusLayoutModule.forRoot(smzHephaestusConfig),
    AthenaLayoutModule.forRoot(smzAthenaConfig)

  ],
  providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig }],
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmzLayoutsModule } from 'ngx-smz-ui';

import { smzLayoutsConfig } from '../globals/smz-layouts.config';
import { CommonModule } from '@angular/common';
import { NgxSmzDialogsModule } from 'ngx-smz-dialogs';
import { buildState, NgxRbkUtilsModule } from 'ngx-rbk-utils';
import { NgxsModule } from '@ngxs/store';
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
    SmzLayoutsModule.forRoot(smzLayoutsConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

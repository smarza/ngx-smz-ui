import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SmzLayoutsModule } from 'ngx-smz-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmzLayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import {DockModule} from 'primeng/dock';

import { SmzDockComponent } from './features/dock/smz-dock.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    DockModule
  ],
  exports: [SmzDockComponent],
  declarations: [SmzDockComponent],
  providers: [],
})
export class NgxSmzDockModule { }

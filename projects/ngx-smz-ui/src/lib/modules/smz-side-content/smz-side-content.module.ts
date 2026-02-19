import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SharedModule } from 'primeng/api';

import { SmzSideContentComponent } from './smz-side-content.component';

@NgModule({
  imports: [
    CommonModule,
    DrawerModule,
    SharedModule,
  ],
  exports: [
    SmzSideContentComponent,
    SharedModule
  ],
  declarations: [
    SmzSideContentComponent,
  ],
  providers: [],
})
export class NgxSmzSideContentModule { }

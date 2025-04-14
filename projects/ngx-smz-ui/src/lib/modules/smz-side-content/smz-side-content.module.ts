import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'primeng/api';

import { SmzSideContentComponent } from './smz-side-content.component';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
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

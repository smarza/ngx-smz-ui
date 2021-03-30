import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule as PrimeSharedModule } from 'primeng/api';

import { SmzSideContentComponent } from './smz-side-content.component';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    PrimeSharedModule,
  ],
  exports: [
    SmzSideContentComponent,
    PrimeSharedModule
  ],
  declarations: [
    SmzSideContentComponent,
  ],
  providers: [],
})
export class NgxSmzSideContentModule { }

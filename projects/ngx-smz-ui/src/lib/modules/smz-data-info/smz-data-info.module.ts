import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { SmzDataInfoComponent } from './smz-data-info.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    SmzDataInfoComponent
  ],
  declarations: [
    SmzDataInfoComponent,
  ],
  providers: [],
})
export class NgxSmzDataInfoModule { }

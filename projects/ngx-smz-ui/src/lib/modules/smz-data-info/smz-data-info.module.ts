import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { SmzDataInfoComponent } from './smz-data-info.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule
  ],
  exports: [
    SmzDataInfoComponent,
    SharedModule
  ],
  declarations: [
    SmzDataInfoComponent,
  ],
  providers: [],
})
export class NgxSmzDataInfoModule { }

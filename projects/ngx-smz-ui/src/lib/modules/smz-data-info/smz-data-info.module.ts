import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule as PrimeSharedModule } from 'primeng/api';
import { SmzDataInfoComponent } from './smz-data-info.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    PrimeSharedModule
  ],
  exports: [
    SmzDataInfoComponent,
    PrimeSharedModule
  ],
  declarations: [
    SmzDataInfoComponent,
  ],
  providers: [],
})
export class NgxSmzDataInfoModule { }

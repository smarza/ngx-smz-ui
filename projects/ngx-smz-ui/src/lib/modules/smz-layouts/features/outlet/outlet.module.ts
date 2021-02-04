import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OutletComponent } from './outlet.component';
import { SharedModule as PrimeSharedModule } from 'primeng/api';

@NgModule({
  declarations: [OutletComponent],
  imports: [
    CommonModule,
    PrimeSharedModule
  ],
  exports: [OutletComponent]
})
export class OutletModule { }

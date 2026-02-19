import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusFooterComponent } from './footer.component';
import { DrawerModule } from 'primeng/drawer';

@NgModule({
  declarations: [HephaestusFooterComponent],
  imports: [
    CommonModule,
    DrawerModule,
  ],
  exports: [HephaestusFooterComponent]
})
export class SmzDiamontFooterModule { }

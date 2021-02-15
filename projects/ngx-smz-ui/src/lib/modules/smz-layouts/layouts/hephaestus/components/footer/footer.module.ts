import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusFooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [HephaestusFooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [HephaestusFooterComponent]
})
export class SmzDiamontFooterModule { }

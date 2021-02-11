import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiamondFooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [DiamondFooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [DiamondFooterComponent]
})
export class SmzDiamontFooterModule { }

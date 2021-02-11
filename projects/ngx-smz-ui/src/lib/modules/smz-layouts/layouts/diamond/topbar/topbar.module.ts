import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiamondTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [DiamondTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [DiamondTopbarComponent]
})
export class SmzDiamontTopbarModule { }

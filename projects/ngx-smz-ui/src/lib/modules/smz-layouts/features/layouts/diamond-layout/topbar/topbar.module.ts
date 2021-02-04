import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { TopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [TopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [TopbarComponent]
})
export class SmzDiamontTopbarModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [SidebarComponent]
})
export class SmzDiamontSidebarModule { }

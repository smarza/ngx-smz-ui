import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [FooterComponent]
})
export class SmzDiamontFooterModule { }

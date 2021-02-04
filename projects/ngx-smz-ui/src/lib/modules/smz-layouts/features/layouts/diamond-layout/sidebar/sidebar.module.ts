import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { HierarchyPipe } from './hierarchy.pipe';

@NgModule({
  declarations: [SidebarComponent, HierarchyPipe],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
  ],
  exports: [SidebarComponent]
})
export class SmzDiamontSidebarModule { }

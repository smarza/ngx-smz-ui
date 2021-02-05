import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './components/menu-item.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuExpandableItemComponent } from './components/menu-expandable-item.component';
import { MenuNodeComponent } from './components/menu-node.component';

@NgModule({
  declarations: [
    SidebarComponent,
    MenuItemComponent,
    MenuExpandableItemComponent,
    MenuNodeComponent,
    HasChildPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
  ],
  exports: [SidebarComponent]
})
export class SmzDiamontSidebarModule { }

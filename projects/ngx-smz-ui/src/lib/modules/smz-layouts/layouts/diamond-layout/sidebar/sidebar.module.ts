import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './components/menu-item.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuExpandableItemComponent } from './components/menu-expandable-item.component';
import { MenuNodeComponent } from './components/menu-node.component';
import { MenuSlimNodeComponent } from './components/menu-slim-node.component';
import { MenuItemActionsModule } from '../../../../../common/menu-item-actions/menu-item-actions.module';

@NgModule({
  declarations: [
    SidebarComponent,
    MenuItemComponent,
    MenuExpandableItemComponent,
    MenuNodeComponent,
    MenuSlimNodeComponent,
    HasChildPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule
  ],
  exports: [SidebarComponent]
})
export class SmzDiamontSidebarModule { }

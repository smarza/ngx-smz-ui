import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiamondSidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { DiamondMenuItemComponent } from './components/menu-item.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { DiamondMenuExpandableItemComponent } from './components/menu-expandable-item.component';
import { DiamondMenuNodeComponent } from './components/menu-node.component';
import { DiamondMenuSlimNodeComponent } from './components/menu-slim-node.component';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';

@NgModule({
  declarations: [
    DiamondSidebarComponent,
    DiamondMenuItemComponent,
    DiamondMenuExpandableItemComponent,
    DiamondMenuNodeComponent,
    DiamondMenuSlimNodeComponent,
    HasChildPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule
  ],
  exports: [DiamondSidebarComponent]
})
export class SmzDiamontSidebarModule { }

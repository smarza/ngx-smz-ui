import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusSidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { HephaestusMenuItemComponent } from './components/menu-item.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { HephaestusMenuExpandableItemComponent } from './components/menu-expandable-item.component';
import { HephaestusMenuNodeComponent } from './components/menu-node.component';
import { HephaestusMenuSlimNodeComponent } from './components/menu-slim-node.component';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';

@NgModule({
  declarations: [
    HephaestusSidebarComponent,
    HephaestusMenuItemComponent,
    HephaestusMenuExpandableItemComponent,
    HephaestusMenuNodeComponent,
    HephaestusMenuSlimNodeComponent,
    HasChildPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule,
    IsVisiblePipeModule
  ],
  exports: [HephaestusSidebarComponent]
})
export class SmzDiamontSidebarModule { }

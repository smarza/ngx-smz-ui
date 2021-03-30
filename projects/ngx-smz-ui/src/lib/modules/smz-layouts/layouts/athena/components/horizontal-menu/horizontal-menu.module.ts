import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AthenaHorizontalMenuComponent } from './horizontal-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { AthenaHorizontalMenuNodeComponent } from './components/menu-node.component';
import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';

@NgModule({
  declarations: [
    AthenaHorizontalMenuComponent,
    AthenaHorizontalMenuNodeComponent,
    HasChildPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule,
    IsVisiblePipeModule
  ],
  exports: [AthenaHorizontalMenuComponent]
})
export class SmzAthenaHorizontalMenuModule { }

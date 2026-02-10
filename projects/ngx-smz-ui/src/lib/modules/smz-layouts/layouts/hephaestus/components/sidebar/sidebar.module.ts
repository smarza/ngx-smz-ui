import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HephaestusSidebarComponent } from './sidebar.component';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
import { HephaestusMenuItemComponent, HephaestusMenuExpandableItemComponent, HephaestusMenuNodeComponent, HephaestusMenuSlimNodeComponent } from './components/menu.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';
import { UrlCheckerPipeModule } from '../../../../../../common/url-checker/url-checker.pipe';

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
    DrawerModule,
    MenuItemActionsModule,
    IsVisiblePipeModule,
    UrlCheckerPipeModule
  ],
  exports: [HephaestusSidebarComponent]
})
export class SmzDiamontSidebarModule { }

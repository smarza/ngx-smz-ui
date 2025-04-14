import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewAthenaHorizontalMenuComponent } from './horizontal-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { NewAthenaHorizontalMenuNodeComponent } from './components/menu-node.component';
import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';
import { UrlCheckerPipeModule } from '../../../../../../common/url-checker/url-checker.pipe';

@NgModule({
  declarations: [
    NewAthenaHorizontalMenuComponent,
    NewAthenaHorizontalMenuNodeComponent,
    HasChildPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule,
    IsVisiblePipeModule,
    UrlCheckerPipeModule
  ],
  exports: [NewAthenaHorizontalMenuComponent]
})
export class SmzAthenaHorizontalMenuModule { }

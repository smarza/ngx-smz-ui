import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmzDataPipesModule } from '../../../../../../common/data-pipes/data-pipes.module';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { HephaestusProfileMenuItemsComponent } from './profile-menu-items.component';
import { HephaestusProfileMenuComponent } from './profile-menu.component';

import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule,
    NgxSmzDataPipesModule,
    IsVisiblePipeModule
  ],
  exports: [HephaestusProfileMenuComponent],
  declarations: [HephaestusProfileMenuComponent, HephaestusProfileMenuItemsComponent],
  providers: [],
})
export class HephaestusProfileMenuModule { }

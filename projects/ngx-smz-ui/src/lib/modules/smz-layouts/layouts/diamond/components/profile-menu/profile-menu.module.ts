import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataPipesModule } from '../../../../../../common/data-pipes/data-pipes.module';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { DiamondProfileMenuItemsComponent } from './profile-menu-items.component';

import { DiamondProfileMenuComponent } from './profile-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule,
    DataPipesModule
  ],
  exports: [DiamondProfileMenuComponent],
  declarations: [DiamondProfileMenuComponent, DiamondProfileMenuItemsComponent],
  providers: [],
})
export class DiamondProfileMenuModule { }

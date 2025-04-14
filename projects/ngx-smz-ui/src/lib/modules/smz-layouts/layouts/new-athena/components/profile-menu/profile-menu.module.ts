import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSmzDataPipesModule } from '../../../../../../common/data-pipes/data-pipes.module';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { HasChildPipe } from './pipes/has-child.pipe';
import { NewAthenaProfileMenuItemsComponent } from './profile-menu-items.component';
import { NewAthenaProfileMenuComponent } from './profile-menu.component';
import { IsVisiblePipeModule } from '../../../../../../common/is-visible-pipe/is-visible.pipe';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule,
    NgxSmzDataPipesModule,
    IsVisiblePipeModule
  ],
  exports: [NewAthenaProfileMenuComponent],
  declarations: [NewAthenaProfileMenuComponent, NewAthenaProfileMenuItemsComponent, HasChildPipe],
  providers: [],
})
export class AthenaProfileMenuModule { }

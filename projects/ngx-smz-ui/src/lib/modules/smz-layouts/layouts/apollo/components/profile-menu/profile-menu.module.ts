import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataPipesModule } from '../../../../../../common/data-pipes/data-pipes.module';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { HasChildPipe } from './pipes/has-child.pipe';
import { ApolloProfileMenuItemsComponent } from './profile-menu-items.component';
import { ApolloProfileMenuComponent } from './profile-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule,
    DataPipesModule,
  ],
  exports: [ApolloProfileMenuComponent],
  declarations: [ApolloProfileMenuComponent, ApolloProfileMenuItemsComponent, HasChildPipe],
  providers: [],
})
export class ApolloProfileMenuModule { }

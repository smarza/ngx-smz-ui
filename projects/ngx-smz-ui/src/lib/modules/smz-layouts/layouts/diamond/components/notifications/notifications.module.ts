import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { DiamondNotificationItemsComponent } from './notification-items.component';

import { DiamondNotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule
  ],
  exports: [DiamondNotificationsComponent],
  declarations: [
    DiamondNotificationsComponent,
    DiamondNotificationItemsComponent
  ],
  providers: [],
})
export class DiamondNotificationsModule { }

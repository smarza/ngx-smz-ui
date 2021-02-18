import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { AthenaNotificationItemsComponent } from './items/notification-items.component';

import { AthenaNotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule
  ],
  exports: [AthenaNotificationsComponent],
  declarations: [
    AthenaNotificationsComponent,
    AthenaNotificationItemsComponent
  ],
  providers: [],
})
export class AthenaNotificationsModule { }

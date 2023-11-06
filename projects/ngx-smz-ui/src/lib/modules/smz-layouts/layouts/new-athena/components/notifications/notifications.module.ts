import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { NewAthenaNotificationItemsComponent } from './items/notification-items.component';

import { NewAthenaNotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule
  ],
  exports: [NewAthenaNotificationsComponent],
  declarations: [
    NewAthenaNotificationsComponent,
    NewAthenaNotificationItemsComponent
  ],
  providers: [],
})
export class AthenaNotificationsModule { }

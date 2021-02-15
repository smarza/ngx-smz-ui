import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { HephaestusNotificationItemsComponent } from './notification-items.component';

import { HephaestusNotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule
  ],
  exports: [HephaestusNotificationsComponent],
  declarations: [
    HephaestusNotificationsComponent,
    HephaestusNotificationItemsComponent
  ],
  providers: [],
})
export class HephaestusNotificationsModule { }

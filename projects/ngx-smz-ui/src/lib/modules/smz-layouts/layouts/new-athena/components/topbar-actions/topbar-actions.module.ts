import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzNotificationsModule } from '../../../../../smz-notifications/ngx-smz-notifications.module';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { AthenaNotificationsModule } from '../notifications/notifications.module';
import { AthenaProfileMenuModule } from '../profile-menu/profile-menu.module';

import { AthenaTopbarActionsComponent } from './topbar-actions.component';
import { SmzTenantSwitchComponent } from '../../../../features/tenant-switch/tenant-switch.component';

@NgModule({
  imports: [
    CommonModule,
    MenuItemActionsModule,
    AthenaProfileMenuModule,
    AthenaNotificationsModule,
    SmzNotificationsModule,
    SmzTenantSwitchComponent
  ],
  exports: [AthenaTopbarActionsComponent],
  declarations: [
    AthenaTopbarActionsComponent,
  ],
  providers: [],
})
export class AthenaTopbarActionsModule { }

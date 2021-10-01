import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxRbkUtilsConfig } from '../rbk-utils/ngx-rbk-utils.config';
import { SmzNotificationsComponent } from './features/notifications/notifications.component';
import { SmzNotificationsService } from './services/smz-notifications.service';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { NotificationsListComponent } from './components/list/notifications-list.component';
import { NotificationItemComponent } from './components/item/notification-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSmzTablesModule } from '../smz-tables/ngx-smz-tables.module';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { NgVarModule } from '../../common/directives/ng-var/ng-var.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      BadgeModule,
      OverlayPanelModule,
      ButtonModule,
      NgxSmzTablesModule,
      InputTextModule,
      TooltipModule,
      SelectButtonModule,
      NgPipesModule,
      NgVarModule,
      ClickStopPropagationModule
    ],
    exports: [SmzNotificationsComponent],
    declarations: [SmzNotificationsComponent, NotificationsListComponent, NotificationItemComponent]
  })
  export class SmzNotificationsModule {
    constructor(configuration: NgxRbkUtilsConfig, service: SmzNotificationsService) {

      if (configuration.notifications?.url != null) {

        if (configuration.notifications?.httpBehavior == null) {
          throw Error('You need to specify the notification httpBehavior on rbk configuration.');
        }

        service.init();
      }

  }

  }

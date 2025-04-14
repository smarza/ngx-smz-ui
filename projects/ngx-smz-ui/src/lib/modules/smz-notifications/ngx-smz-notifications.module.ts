import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { NgVarModule } from '../../common/directives/ng-var/ng-var.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { GlobalInjector } from '../../common/services/global-injector';
import { SharedModule } from 'primeng/api';
import { SmzResponsiveComponent } from '../smz-responsive/smz-responsive.component';
import { FilterByPipe } from '../../common/data-pipes/pipes/filter-by';
import { ShortenPipe } from '../../common/data-pipes/pipes/shorten.pipe';

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
      NgVarModule,
      ClickStopPropagationModule,
      NgxSmzDataPipesModule,
      SharedModule,
      SmzResponsiveComponent,
      FilterByPipe,
      ShortenPipe
    ],
    exports: [SmzNotificationsComponent],
    declarations: [SmzNotificationsComponent, NotificationsListComponent, NotificationItemComponent]
  })
  export class SmzNotificationsModule {
    constructor(service: SmzNotificationsService) {

      const config = GlobalInjector.config;

      if (config.rbkUtils.notifications?.url != null) {

        if (config.rbkUtils.notifications?.httpBehavior == null) {
          throw Error('You need to specify the notification httpBehavior on rbk configuration.');
        }

        service.init();
      }

  }

  }

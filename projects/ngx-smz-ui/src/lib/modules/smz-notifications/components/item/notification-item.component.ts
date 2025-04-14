import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationData, NotificationStatus, NotificationTypeClass } from '../../../../state/ui/notifications/notifications.model';
import { GlobalInjector } from '../../../../common/services/global-injector';


@Component({
    selector: 'smz-notification-item',
    templateUrl: 'notification-item.component.html',
    styleUrls: ['notification-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class NotificationItemComponent implements OnInit {
  @Input() public item: NotificationData;
  @Input() public charactersLimit: number;
  @Input() public showDate: boolean;
  public status = NotificationStatus;
  public typeClass = NotificationTypeClass;
  public uiConfig = GlobalInjector.config;
  constructor() { }

  ngOnInit() {
  }
}
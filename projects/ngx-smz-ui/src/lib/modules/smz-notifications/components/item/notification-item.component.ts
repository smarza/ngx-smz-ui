import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationData, NotificationStatus, NotificationTypeClass } from '../../../../state/ui/notifications/notifications.model';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';

@Component({
  selector: 'smz-notification-item',
  templateUrl: 'notification-item.component.html',
  styleUrls: ['notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class NotificationItemComponent implements OnInit {
  @Input() public item: NotificationData;
  @Input() public charactersLimit: number;
  @Input() public showDate: boolean;
  public status = NotificationStatus;
  public typeClass = NotificationTypeClass;
  constructor(public rbkConfig: NgxRbkUtilsConfig) { }

  ngOnInit() {
  }
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotificationData } from '../../../../state/ui/notifications/notifications.model';
import { Observable } from 'rxjs';
import { NotificationsUiSelectors } from '../../../../state/ui/notifications/notifications.selectors';
import { NgxRbkUtilsConfig } from '../../../rbk-utils/ngx-rbk-utils.config';

@Component({
  selector: 'smz-ui-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmzNotificationsComponent {

  @Select(NotificationsUiSelectors.all) public notifications$: Observable<NotificationData[]>;
  @Select(NotificationsUiSelectors.newCount) public newCount$: Observable<number>;
  constructor(public store: Store, public rbkConfig: NgxRbkUtilsConfig) {
  }

}


import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotificationData } from '../../../../state/ui/notifications/notifications.model';
import { Observable } from 'rxjs';
import { NotificationsUiSelectors } from '../../../../state/ui/notifications/notifications.selectors';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { showNotificationsDialog } from '../../dialogs/show-notifications-dialog';

@Component({
    selector: 'smz-ui-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SmzNotificationsComponent {
  public uiConfig = GlobalInjector.config;

  @Select(NotificationsUiSelectors.all) public notifications$: Observable<NotificationData[]>;
  @Select(NotificationsUiSelectors.newCount) public newCount$: Observable<number>;
  constructor(public store: Store) {
  }

  public showDialog(): void {
    showNotificationsDialog();
  }

}

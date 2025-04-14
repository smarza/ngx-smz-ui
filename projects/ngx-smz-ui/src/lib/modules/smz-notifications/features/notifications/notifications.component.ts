
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
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

  public notifications$ = inject(Store).select(NotificationsUiSelectors.all);
  public newCount$ = inject(Store).select(NotificationsUiSelectors.newCount);
  constructor() {
  }

  public showDialog(): void {
    showNotificationsDialog();
  }

}

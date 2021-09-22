
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { SmzNotificationsService } from '../../services/smz-notifications.service';

@Component({
  selector: 'smz-ui-notifications',
  templateUrl: './notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmzNotificationsComponent {


  constructor(public notificationService: SmzNotificationsService) {}

}

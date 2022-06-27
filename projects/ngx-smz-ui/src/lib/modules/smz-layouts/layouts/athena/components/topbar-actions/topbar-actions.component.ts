import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgxRbkUtilsConfig } from '../../../../../rbk-utils/ngx-rbk-utils.config';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: '[smz-ui-athena-topbar-actions]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./topbar-actions.component.scss'],
  template: `
      <ng-content></ng-content>

      <div id="smz-ui-topbar"></div>

      <span *ngIf="headerExtrasTemplate != null" class="col extras-container justify-end extras-container mr-3">
          <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
      </span>

      <ng-container *ngIf="rbkConfig.notifications.url != null; else modelDrivenNotificationsTemplate">
        <smz-ui-notifications class="mr-5"></smz-ui-notifications>
      </ng-container>

      <ng-template #modelDrivenNotificationsTemplate>
        <span class="notification-container" *ngIf="notifications != null" smz-ui-athena-notifications [items]="notifications"></span>
      </ng-template>

      <span *ngIf="profile != null" smz-ui-athena-profile-menu [profile]="profile"></span>

  `,
})
export class AthenaTopbarActionsComponent implements OnInit {

  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];
  @Input() public headerExtrasTemplate: TemplateRef<any>;

  constructor(public rbkConfig: NgxRbkUtilsConfig) {}

  public ngOnInit(): void {
  }

}

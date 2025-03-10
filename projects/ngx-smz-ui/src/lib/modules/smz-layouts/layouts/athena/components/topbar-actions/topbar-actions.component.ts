import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzNotification } from '../../../../core/models/notifications';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
  selector: '[smz-ui-athena-topbar-actions]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./topbar-actions.component.scss'],
  template: `
      <ng-content></ng-content>

      <div id="smz-ui-topbar"></div>

      <span class="col extras-container justify-end extras-container mr-3">
        <ng-container *ngIf="headerExtrasTemplate != null">
          <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
        </ng-container>
      </span>

      <ng-container *ngIf="uiConfig.rbkUtils.notifications.url != null; else modelDrivenNotificationsTemplate">
        <smz-ui-notifications id="smz-ui-notifications" class="mr-5"></smz-ui-notifications>
      </ng-container>

      <ng-template #modelDrivenNotificationsTemplate>
        <span class="notification-container" *ngIf="notifications != null" smz-ui-athena-notifications [items]="notifications"></span>
      </ng-template>

      <smz-localization-switch *ngIf="showLocalizationSwitch" class="mr-3"></smz-localization-switch>

      <smz-tenant-switch *ngIf="showTenantSwitch" class="mr-3"></smz-tenant-switch>

      <span id="smz-ui-profile-menu" *ngIf="profile != null" smz-ui-athena-profile-menu [profile]="profile"></span>

  `,
})
export class AthenaTopbarActionsComponent {
  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];
  @Input() public headerExtrasTemplate: TemplateRef<any>;
  public showLocalizationSwitch = GlobalInjector.config.rbkUtils.uiLocalization.allowLocalizationSwitching;
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;
  public uiConfig = GlobalInjector.config;

}

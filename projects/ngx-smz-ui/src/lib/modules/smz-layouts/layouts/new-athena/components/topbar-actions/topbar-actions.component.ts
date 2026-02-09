import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzNotification } from '../../../../core/models/notifications';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: '[smz-ui-new-athena-topbar-actions]',
    changeDetection: ChangeDetectionStrategy.Default,
    styleUrls: ['./topbar-actions.component.scss'],
    template: `
      <ng-content></ng-content>

      <div id="smz-ui-topbar"></div>

      <smz-responsive class="col grid grid-nogutter w-full items-center justify-start">

      <!-- LANDSCAPE -->
        <ng-template pTemplate="landscape">

          <span class="col extras-container justify-end extras-container mr-3">
            <ng-container *ngIf="headerExtrasTemplate != null">
              <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
            </ng-container>
          </span>

          <ng-container *ngIf="uiConfig.rbkUtils.notifications.url != null; else modelDrivenNotificationsTemplate1">
            <smz-ui-notifications id="smz-ui-notifications" class="mt-2"></smz-ui-notifications>
          </ng-container>

          <ng-template #modelDrivenNotificationsTemplate1>
            <span class="notification-container" *ngIf="notifications != null" smz-ui-new-athena-notifications [items]="notifications"></span>
          </ng-template>

          <smz-localization-switch *ngIf="showLocalizationSwitch" class="mr-3"></smz-localization-switch>

          <smz-tenant-switch *ngIf="showTenantSwitch" class="mr-3"></smz-tenant-switch>

          <span id="smz-ui-profile-menu" *ngIf="profile != null" smz-ui-new-athena-profile-menu [profile]="profile"></span>

        </ng-template>

        <!-- PORTRAIT -->
        <ng-template pTemplate="portrait">

          <span class="col extras-container justify-end extras-container mr-3">
            <ng-container *ngIf="headerExtrasTemplate != null">
              <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
            </ng-container>
          </span>

          <ng-container *ngIf="uiConfig.rbkUtils.notifications.url != null; else modelDrivenNotificationsTemplate2">
            <smz-ui-notifications id="smz-ui-notifications" class="mt-2"></smz-ui-notifications>
          </ng-container>

          <ng-template #modelDrivenNotificationsTemplate2>
            <span class="notification-container" *ngIf="notifications != null" smz-ui-new-athena-notifications [items]="notifications"></span>
          </ng-template>

          <smz-tenant-switch *ngIf="showTenantSwitch" class="mr-3"></smz-tenant-switch>

          <span id="smz-ui-profile-menu" *ngIf="profile != null" smz-ui-new-athena-profile-menu [profile]="profile"></span>

        </ng-template>

      </smz-responsive>

  `,
    standalone: false
})
export class AthenaTopbarActionsComponent {

  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];
  @Input() public headerExtrasTemplate: TemplateRef<any>;
  public uiConfig = GlobalInjector.config;
  public showLocalizationSwitch = GlobalInjector.config.rbkUtils.uiLocalization.allowLocalizationSwitching;
  public showTenantSwitch = GlobalInjector.config.rbkUtils.authentication.allowTenantSwitching;

}

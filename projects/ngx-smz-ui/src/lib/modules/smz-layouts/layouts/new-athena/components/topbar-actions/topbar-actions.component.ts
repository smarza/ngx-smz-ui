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
            @if (headerExtrasTemplate != null) {
              <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
            }
          </span>
      
          @if (uiConfig.rbkUtils.notifications.url != null) {
            <smz-ui-notifications id="smz-ui-notifications" class="mt-2"></smz-ui-notifications>
          } @else {
            @if (notifications != null) {
              <span class="notification-container" smz-ui-new-athena-notifications [items]="notifications"></span>
            }
          }
      
      
          @if (showLocalizationSwitch) {
            <smz-localization-switch class="mr-3"></smz-localization-switch>
          }
      
          @if (showTenantSwitch) {
            <smz-tenant-switch class="mr-3"></smz-tenant-switch>
          }
      
          @if (profile != null) {
            <span id="smz-ui-profile-menu" smz-ui-new-athena-profile-menu [profile]="profile"></span>
          }
      
        </ng-template>
      
        <!-- PORTRAIT -->
        <ng-template pTemplate="portrait">
      
          <span class="col extras-container justify-end extras-container mr-3">
            @if (headerExtrasTemplate != null) {
              <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
            }
          </span>
      
          @if (uiConfig.rbkUtils.notifications.url != null) {
            <smz-ui-notifications id="smz-ui-notifications" class="mt-2"></smz-ui-notifications>
          } @else {
            @if (notifications != null) {
              <span class="notification-container" smz-ui-new-athena-notifications [items]="notifications"></span>
            }
          }
      
      
          @if (showTenantSwitch) {
            <smz-tenant-switch class="mr-3"></smz-tenant-switch>
          }
      
          @if (profile != null) {
            <span id="smz-ui-profile-menu" smz-ui-new-athena-profile-menu [profile]="profile"></span>
          }
      
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

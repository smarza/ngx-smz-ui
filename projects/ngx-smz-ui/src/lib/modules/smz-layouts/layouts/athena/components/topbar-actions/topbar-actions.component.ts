import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: '[smz-ui-athena-topbar-actions]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./topbar-actions.component.scss'],
  template: `
      <ng-content></ng-content>

      <div id="smz-ui-athena-topbar"></div>

      <span *ngIf="headerExtrasTemplate != null" class="extras-container p-mr-3">
          <ng-container *ngTemplateOutlet="headerExtrasTemplate"></ng-container>
      </span>

      <span class="notification-container" *ngIf="notifications != null" smz-ui-athena-notifications [items]="notifications"></span>

      <span *ngIf="profile != null" smz-ui-athena-profile-menu [profile]="profile"></span>

  `,
})
export class AthenaTopbarActionsComponent implements OnInit {

  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];
  @Input() public headerExtrasTemplate: TemplateRef<any>;

  constructor() {}

  public ngOnInit(): void {
  }

}

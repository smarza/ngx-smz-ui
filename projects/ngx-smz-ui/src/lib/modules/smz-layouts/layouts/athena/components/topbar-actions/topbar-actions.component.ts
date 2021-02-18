import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: '[smz-ui-athena-topbar-actions]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./topbar-actions.component.scss'],
  template: `
      <ng-content></ng-content>

      <span *ngIf="profile?.length > 0" smz-ui-athena-profile-menu [profile]="profile"></span>

      <span class="notification-container" *ngIf="notifications?.length > 0" smz-ui-athena-notifications [items]="notifications"></span>

  `,
})
export class AthenaTopbarActionsComponent implements OnInit {
  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];

  constructor() {}

  public ngOnInit(): void {}

}

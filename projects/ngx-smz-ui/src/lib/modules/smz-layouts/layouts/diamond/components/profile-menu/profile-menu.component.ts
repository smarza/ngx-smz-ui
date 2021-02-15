import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";
import { Select } from '@ngxs/store';
import { AuthenticationSelectors } from 'ngx-rbk-utils';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';

@Component({
  selector: "[smz-ui-diamond-profile-menu]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a (click)="toggle()">
      <ng-container *ngIf="userData$ | async as userdata">
        <img [src]="avatar | safeUrl" class="profile-image" />
        <span class="profile-name">{{ userdata[config.usernameProperty] }}</span>
      </ng-container>
    </a>
    <ul *ngIf="isExpanded" class="profile-menu fade-in-up" smz-ui-diamond-profile-menu-items [items]="items" (onClose)="collapse()"></ul>
  `,
})
export class DiamondProfileMenuComponent implements OnInit {
  @Input() public items: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<{ name: string }>;
  public isExpanded = false;
  public avatar = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KICA8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgc3R5bGU9ImZpbGw6ICMzZmE5ZjUiLz4KICA8dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OSAxODEuMzcpIiBzdHlsZT0iZm9udC1zaXplOiAxNTguMDAzNDAyNzA5OTYwOTRweDtmaWxsOiAjZmZmO2ZvbnQtZmFtaWx5OiBBcmlhbE1ULCBBcmlhbCI+Ukk8L3RleHQ+Cjwvc3ZnPgo=';
  constructor(public readonly config: SmzLayoutsConfig) {}

  public ngOnInit(): void {}

  @HostBinding("class") public get themeClass() {
    return this.isExpanded ? "active-menuitem" : "";
  }

  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public test(event): void
  {
    console.log(event);
  }

}

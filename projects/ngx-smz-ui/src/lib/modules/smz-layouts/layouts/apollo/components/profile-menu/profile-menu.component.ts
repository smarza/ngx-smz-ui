import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from "@angular/core";
import { Select, Store } from '@ngxs/store';
import { AuthenticationActions, AuthenticationSelectors } from 'ngx-rbk-utils';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: "[smz-ui-apollo-profile-menu]",
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <ng-content></ng-content>
      <a class="profile clickable" (click)="toggle()">
        <ng-container *ngIf="userData$ | async as userdata">
          <span class="username">{{ userdata[config.usernameProperty] }}</span>
          <img [src]="avatar | safeUrl">
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-container>
      </a>
      <ul *ngIf="isExpanded" class="topbar-menu fadeInDown topbar-menu-visible" smz-ui-apollo-profile-menu-items [items]="items"></ul>
  `,
})
export class ApolloProfileMenuComponent implements OnInit, AfterViewInit {
  @Input() public profile: MenuItem[] = [];
  @Input() public notifications: SmzNotification[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<{ name: string }>;
  public items: MenuItem[] = [];
  public isExpanded = false;
  private isLoaded = false;
  public avatar = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KICA8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgc3R5bGU9ImZpbGw6ICMzZmE5ZjUiLz4KICA8dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OSAxODEuMzcpIiBzdHlsZT0iZm9udC1zaXplOiAxNTguMDAzNDAyNzA5OTYwOTRweDtmaWxsOiAjZmZmO2ZvbnQtZmFtaWx5OiBBcmlhbE1ULCBBcmlhbCI+Ukk8L3RleHQ+Cjwvc3ZnPgo=';
  constructor(public readonly config: SmzLayoutsConfig, private _eref: ElementRef, private store: Store) {}

  public ngOnInit(): void {

    if (this.profile != null && this.profile.length > 0) {
      this.items.push({ label: 'Perfil', items: this.profile, icon: 'pi-user'});
    }

    if (this.profile != null && this.profile.length > 0) {
      this.items.push({ label: 'Notificações', items: this.notifications.map(x => ({ ...x, label: `${x.summary}: ${x.details}`})), icon: 'pi-user', badge: this.notifications.length.toString() });
    }

    this.items.push({ label: 'Logout', icon: 'pi-sign-out', command: () => { this.store.dispatch(new AuthenticationActions.Logout) }});

  }

  @HostBinding("class") public get themeClass() {
    return this.isExpanded ? "active-menuitem" : "";
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 0);
  }

  public collapse(): void {
    if (this.isLoaded && !this._eref.nativeElement.contains(event.target)){
      this.isExpanded = false;
    }
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

}

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";
import { Select } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { Observable } from 'rxjs';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: "[smz-ui-hephaestus-profile-menu]",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <a class="profile clickable grid items-center justify-end m-0 p-0 flex-nowrap gap-2" [ngClass]="{ 'profile-with-icon': !uiConfig.layouts.useAvatar }" (click)="toggle()">
      <ng-container *ngIf="userData$ | async as userdata; else noUserTemplate">
        <span class="username">{{ uiConfig.layouts.profileMessage }}{{ userdata[uiConfig.layouts.usernameProperty] }}</span>
        <img
          *ngIf="uiConfig.layouts.useAvatar && userdata[uiConfig.layouts.avatarProperty]"
          [src]="(userdata[uiConfig.layouts.avatarProperty] ) | safeUrl"
          class="profile-image"
          (error)="handleMissingImage($event, userdata[uiConfig.layouts.usernameProperty], userdata[uiConfig.layouts.avatarProperty])"
        >
        <i *ngIf="!uiConfig.layouts.useAvatar || (uiConfig.layouts.useAvatar && !userdata[uiConfig.layouts.avatarProperty])" class="fa-solid fa-circle-user profile-image profile-icon-menu"></i>
        <i class="profile-submenu-icon pi pi-angle-down"></i>
      </ng-container>

      <ng-template #noUserTemplate>
        <i class="fa-solid fa-circle-user profile-image profile-icon-menu"></i>
        <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-template>
    </a>
    <ul *ngIf="isExpanded" class="profile-menu fade-in-up" smz-ui-hephaestus-profile-menu-items [items]="items" (onClose)="collapse()"></ul>
  `,
    standalone: false
})
export class HephaestusProfileMenuComponent implements OnInit {
  @Input() public items: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<never>;
  public isExpanded = false;
  public uiConfig = GlobalInjector.config;
  // public avatar = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KICA8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgc3R5bGU9ImZpbGw6ICMzZmE5ZjUiLz4KICA8ZyBpZD0ibUZEQVB4LnRpZiI+CiAgICA8Zz4KICAgICAgPHBhdGggZD0iTTEyNy45MiwxOThoLTU1Yy00LjExLDAtNy45MS0uODUtMTAuOTMtMy44OWExMi44NiwxMi44NiwwLDAsMS00LTkuMjdjLS4wNS00LjUyLS4xLTksMS4xMy0xMy40NWEzNC43OCwzNC43OCwwLDAsMSwxOS42OS0yMy4wOSwzMy44NywzMy44NywwLDAsMSwxNC43Mi0zYy43NCwwLDEuNDksMCwyLjIzLDBhNTcuNjUsNTcuNjUsMCwwLDEsMjAuMzEsMi41OWMxMC4xNCwzLjE3LDIwLjM4LDIuMTIsMzAuMjItMmE2LDYsMCwwLDEsMi40Ni0uNTZjNC45NCwwLDkuODgtLjA2LDE0LjgyLDBhMzQuNzksMzQuNzksMCwwLDEsMzMuOTIsMzAuNDZjLjUyLDQuMzcuODgsOC44LS4zNywxMy4xM2ExMywxMywwLDAsMS0xMC44OSw4LjgyYy0yLC4xOC0zLjkyLjI0LTUuODkuMjRaIiBzdHlsZT0iZmlsbDogI2ZmZiIvPgogICAgICA8cGF0aCBkPSJNODguNjUsOTcuNTJhMzkuMywzOS4zLDAsMSwxLDM5LjA5LDM5LjI2QzEwNiwxMzYuNzEsODguMzgsMTE4LjY5LDg4LjY1LDk3LjUyWiIgc3R5bGU9ImZpbGw6ICNmZmYiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=';
  constructor() {}

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

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = GlobalInjector.config.rbkUtils.authorization.users.avatarPlaceholderPath;
  }

}

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from "@angular/core";
import { Select } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { Observable } from 'rxjs';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';

@Component({
  selector: "[smz-ui-hephaestus-profile-menu]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="profile clickable grid align-content-center justify-content-end m-0 p-0 flex-nowrap gap-2" [ngClass]="{ 'profile-with-icon': !config.useAvatar }" (click)="toggle()">
      <ng-container *ngIf="userData$ | async as userdata">
        <span class="username">{{ config.profileMessage }}{{ userdata[config.usernameProperty] }}</span>
        <img *ngIf="config.useAvatar && userdata[config.avatarProperty]" [src]="(userdata[config.avatarProperty] ) | safeUrl" class="profile-image">
        <i *ngIf="!config.useAvatar || (config.useAvatar && !userdata[config.avatarProperty])" class="fas fa-user-circle profile-image profile-icon-menu"></i>
        <i class="profile-submenu-icon pi pi-angle-down"></i>
      </ng-container>
    </a>
    <ul *ngIf="isExpanded" class="profile-menu fade-in-up" smz-ui-hephaestus-profile-menu-items [items]="items" (onClose)="collapse()"></ul>
  `,
})
export class HephaestusProfileMenuComponent implements OnInit {
  @Input() public items: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<never>;
  public isExpanded = false;
  // public avatar = 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KICA8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgc3R5bGU9ImZpbGw6ICMzZmE5ZjUiLz4KICA8ZyBpZD0ibUZEQVB4LnRpZiI+CiAgICA8Zz4KICAgICAgPHBhdGggZD0iTTEyNy45MiwxOThoLTU1Yy00LjExLDAtNy45MS0uODUtMTAuOTMtMy44OWExMi44NiwxMi44NiwwLDAsMS00LTkuMjdjLS4wNS00LjUyLS4xLTksMS4xMy0xMy40NWEzNC43OCwzNC43OCwwLDAsMSwxOS42OS0yMy4wOSwzMy44NywzMy44NywwLDAsMSwxNC43Mi0zYy43NCwwLDEuNDksMCwyLjIzLDBhNTcuNjUsNTcuNjUsMCwwLDEsMjAuMzEsMi41OWMxMC4xNCwzLjE3LDIwLjM4LDIuMTIsMzAuMjItMmE2LDYsMCwwLDEsMi40Ni0uNTZjNC45NCwwLDkuODgtLjA2LDE0LjgyLDBhMzQuNzksMzQuNzksMCwwLDEsMzMuOTIsMzAuNDZjLjUyLDQuMzcuODgsOC44LS4zNywxMy4xM2ExMywxMywwLDAsMS0xMC44OSw4LjgyYy0yLC4xOC0zLjkyLjI0LTUuODkuMjRaIiBzdHlsZT0iZmlsbDogI2ZmZiIvPgogICAgICA8cGF0aCBkPSJNODguNjUsOTcuNTJhMzkuMywzOS4zLDAsMSwxLDM5LjA5LDM5LjI2QzEwNiwxMzYuNzEsODguMzgsMTE4LjY5LDg4LjY1LDk3LjUyWiIgc3R5bGU9ImZpbGw6ICNmZmYiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=';
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

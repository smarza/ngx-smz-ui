import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, OnInit, QueryList } from "@angular/core";
import { Select, Store } from '@ngxs/store';
import { AuthenticationSelectors } from 'ngx-rbk-utils';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { SmzLayoutsConfig } from '../../../../core/globals/smz-layouts.config';

@Component({
  selector: "[smz-ui-athena-profile-menu]",
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <!-- <ng-content></ng-content> -->
      <a class="profile clickable" [ngClass]="{ 'profile-with-icon': !config.useAvatar }" (click)="toggle()">
        <ng-container *ngIf="userData$ | async as userdata">
          <span class="username">{{ config.profileMessage }}{{ userdata[config.usernameProperty] }}</span>
          <img *ngIf="config.useAvatar" [src]="(userdata[config.avatarProperty] ) | safeUrl" class="profile-image">
          <i *ngIf="!config.useAvatar" class="fas fa-user-circle profile-image profile-icon-menu"></i>
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-container>
      </a>
      <ul *ngIf="isExpanded" class="topbar-menu fadeInDown topbar-menu-visible" smz-ui-athena-profile-menu-items [items]="profile" (collapse)="isExpanded = false"></ul>
  `,
})
export class AthenaProfileMenuComponent implements OnInit, AfterViewInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public profile: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<never>;
  public items: MenuItem[] = [];
  public isExpanded = false;
  private isLoaded = false;
  // public avatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHN0eWxlPSJmaWxsOiM2NDk1ZWQiLz48dGV4dCB4PSI1MCUiIHk9IjE0Mi41cHgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6MTYwcHg7ZmlsbDojZmZmO2ZvbnQtZmFtaWx5OkFyaWFsTVQsIEFyaWFsIj5CPC90ZXh0Pjwvc3ZnPg==';
  constructor(public readonly config: SmzLayoutsConfig, private _eref: ElementRef, private store: Store) {}

  public ngOnInit(): void {
  }

  @HostBinding("class") public get themeClass() {
    return this.isExpanded ? "active-menuitem" : "";
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 0);
  }

  public collapse(event: any): void {
    if (this.isLoaded && !this._eref.nativeElement.contains(event.target)){
      this.isExpanded = false;
    }
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

}

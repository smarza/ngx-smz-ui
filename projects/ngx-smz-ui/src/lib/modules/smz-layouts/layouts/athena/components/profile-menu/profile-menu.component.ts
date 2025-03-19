import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, OnInit, QueryList } from "@angular/core";
import { Select, Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
    selector: "[smz-ui-athena-profile-menu]",
    host: { "(document:click)": "collapse($event)" },
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <!-- <ng-content></ng-content> -->
      <a class="profile clickable grid items-center justify-end m-0 p-0 flex-nowrap gap-2" [ngClass]="{ 'profile-with-icon': !uiConfig.layouts.useAvatar }" (click)="toggle()">
        <ng-container *ngIf="userData$ | async as userdata; else noUserTemplate">
          <span class="username">{{ uiConfig.layouts.profileMessage }}{{ userdata[uiConfig.layouts.usernameProperty] }}</span>
          <img *ngIf="uiConfig.layouts.useAvatar && userdata[uiConfig.layouts.avatarProperty]" [src]="(userdata[uiConfig.layouts.avatarProperty] ) | safeUrl" class="profile-image">
          <i *ngIf="!uiConfig.layouts.useAvatar || (uiConfig.layouts.useAvatar && !userdata[uiConfig.layouts.avatarProperty])" class="fa-solid fa-circle-user profile-icon profile-icon-menu"></i>
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-container>

        <ng-template #noUserTemplate>
          <i class="fa-solid fa-circle-user profile-icon profile-icon-menu"></i>
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-template>
      </a>
      <ul *ngIf="isExpanded" class="topbar-menu fadeInDown topbar-menu-visible" smz-ui-athena-profile-menu-items [items]="profile" (collapse)="isExpanded = false"></ul>
  `,
    standalone: false
})
export class AthenaProfileMenuComponent implements OnInit, AfterViewInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public profile: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<never>;
  public items: MenuItem[] = [];
  public isExpanded = false;
  private isLoaded = false;
  public uiConfig = GlobalInjector.config;
  // public avatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHN0eWxlPSJmaWxsOiM2NDk1ZWQiLz48dGV4dCB4PSI1MCUiIHk9IjE0Mi41cHgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJmb250LXNpemU6MTYwcHg7ZmlsbDojZmZmO2ZvbnQtZmFtaWx5OkFyaWFsTVQsIEFyaWFsIj5CPC90ZXh0Pjwvc3ZnPg==';
  constructor(private _eref: ElementRef) {}

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

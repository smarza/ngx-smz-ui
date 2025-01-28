import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostBinding, Input, OnInit, QueryList } from "@angular/core";
import { Select, Store } from '@ngxs/store';
import { AuthenticationSelectors } from '../../../../../../state/global/authentication/authentication.selectors';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { Observable } from 'rxjs';
import { GlobalInjector } from '../../../../../../common/services/global-injector';

@Component({
  selector: "[smz-ui-new-athena-profile-menu]",
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <!-- <ng-content></ng-content> -->
      <a class="profile clickable grid items-center justify-end m-0 p-0 flex-nowrap gap-2" [ngClass]="{ 'profile-with-icon': !uiConfig.layouts.useAvatar }" (click)="toggle()">
        <ng-container *ngIf="userData$ | async as userdata; else noUserTemplate">
          <span class="username">{{ uiConfig.layouts.profileMessage }}{{ userdata[uiConfig.layouts.usernameProperty] }}</span>
          <img
            *ngIf="uiConfig.layouts.useAvatar && userdata[uiConfig.layouts.avatarProperty]"
            [src]="(userdata[uiConfig.layouts.avatarProperty] ) | safeUrl"
            class="profile-image"
            (error)="handleMissingImage($event, userdata[uiConfig.layouts.usernameProperty], userdata[uiConfig.layouts.avatarProperty])"
          >
          <i *ngIf="!uiConfig.layouts.useAvatar || (uiConfig.layouts.useAvatar && !userdata[uiConfig.layouts.avatarProperty])" class="fa-solid fa-circle-user profile-icon profile-icon-menu"></i>
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-container>

        <ng-template #noUserTemplate>
          <i class="fa-solid fa-circle-user profile-icon profile-icon-menu"></i>
          <i class="profile-submenu-icon pi pi-angle-down"></i>
        </ng-template>
      </a>
      <ul *ngIf="isExpanded" class="topbar-menu fadeInDown topbar-menu-visible" smz-ui-new-athena-profile-menu-items [items]="profile" (collapse)="isExpanded = false"></ul>
  `,
})
export class NewAthenaProfileMenuComponent implements OnInit, AfterViewInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public profile: MenuItem[] = [];
  @Select(AuthenticationSelectors.userdata) public userData$: Observable<never>;
  public items: MenuItem[] = [];
  public isExpanded = false;
  private isLoaded = false;
  public uiConfig = GlobalInjector.config;

  constructor(private _eref: ElementRef, private store: Store) {}

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

  public handleMissingImage(event: Event, user: string, notfound: string) {
    console.warn(`Avatar not found on (${notfound}) for user: ${user}`);
    (event.target as HTMLImageElement).src = GlobalInjector.config.rbkUtils.authorization.users.avatarPlaceholderPath;
  }

}

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: '[smz-ui-new-athena-notifications]',
  host: { "(document:click)": "collapse($event)" },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./notifications.component.scss'],
  template: `
      <a class="notification clickable" (click)="toggle()">
          <!-- <span class="username">Notificações</span>
          <i class="profile-submenu-icon pi pi-angle-down"></i> -->
          <i class="pi pi-bell"></i><span class="topbar-badge">{{ items.length }}</span>
      </a>
      <ul *ngIf="isExpanded" class="topbar-menu topbar-notification-menu-top-adjust fadeInDown topbar-menu-visible" smz-ui-new-athena-notification-items [items]="items"></ul>
  `,
})
export class NewAthenaNotificationsComponent implements OnInit, AfterViewInit {
  @Input() public items: SmzNotification[] = [];
  public isExpanded = false;
  private isLoaded = false;
  constructor(private _eref: ElementRef) {}

  public ngOnInit(): void {}

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

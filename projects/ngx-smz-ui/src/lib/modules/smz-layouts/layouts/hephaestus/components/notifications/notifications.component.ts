import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { SmzNotification } from '../../../../core/models/notifications';

@Component({
  selector: '[smz-ui-hephaestus-notifications]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a (click)="toggle()">
      <i class="pi pi-bell"></i><span class="topbar-badge">{{ items.length }}</span>
    </a>
    <ul *ngIf="isExpanded" class="notifications-menu fade-in-up" smz-ui-hephaestus-notification-items (onClose)="collapse()" [items]="items"></ul>
  `,
})
export class HephaestusNotificationsComponent implements OnInit {
  @Input() public items: SmzNotification[] = [];
  public isExpanded = false;
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
}

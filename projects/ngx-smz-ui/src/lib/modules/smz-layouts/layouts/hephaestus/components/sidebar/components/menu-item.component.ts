import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'smz-ui-hephaestus-menu-item',
  template: `
      <li [ngClass]="{ 'active-menuitem': currentUrl | urlChecker : item.routerLink }">
        <a class="p-ripple" [ngClass]="{ 'active-route': currentUrl | urlChecker : item.routerLink }" menuItemAction [item]="item" [parent]="parent" [breadcrumbs]="true" [tabindex]="index">
            <i class="layout-menuitem-icon pi pi-fw" [ngClass]="item.icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <span class="p-ink"></span>
        </a>

        <ng-container *ngFor="let subItem of item.items | isVisible">
          <smz-ui-hephaestus-menu-node [item]="subItem" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-node>
        </ng-container>

      </li>
  `
})

export class HephaestusMenuItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public parent: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
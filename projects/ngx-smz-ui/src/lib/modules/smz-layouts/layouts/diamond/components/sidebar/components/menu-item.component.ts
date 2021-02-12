import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'smz-ui-diamond-menu-item',
  template: `
      <li [ngClass]="{ 'active-menuitem': currentUrl === '/' + item.routerLink }">
        <a class="p-ripple" [ngClass]="{ 'active-route': currentUrl === '/' + item.routerLink }" menuItemAction [item]="item" [tabindex]="index">
            <i class="layout-menuitem-icon pi pi-fw" [ngClass]="item.icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <span class="p-ink"></span>
        </a>

        <ng-container *ngFor="let subItem of item.items">
          <smz-ui-diamond-menu-node [item]="subItem" [currentUrl]="currentUrl"></smz-ui-diamond-menu-node>
        </ng-container>

      </li>
  `
})

export class DiamondMenuItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
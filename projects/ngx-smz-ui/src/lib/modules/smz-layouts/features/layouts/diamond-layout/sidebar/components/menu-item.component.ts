import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'smz-ui-menu-item',
  template: `
      <li [ngClass]="{ 'active-menuitem': currentUrl === '/' + item.routerLink }">
        <a class="p-ripple" [ngClass]="{ 'active-route': currentUrl === '/' + item.routerLink }" [tabindex]="index" [routerLink]="item.routerLink">
            <i class="layout-menuitem-icon pi pi-fw" [ngClass]="item.icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <span class="p-ink"></span>
        </a>

        <ng-container *ngFor="let subItem of item.items">
          <smz-ui-menu-node [item]="subItem" [currentUrl]="currentUrl"></smz-ui-menu-node>
        </ng-container>

      </li>
  `
})

export class MenuItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
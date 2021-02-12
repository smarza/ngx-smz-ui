import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'smz-ui-diamond-menu-expandable-item',
  template: `
      <li [ngClass]="{ 'active-menuitem': item.expanded }">

          <a [tabindex]="index" (click)="item.expanded = !item.expanded;">
              <i class="layout-menuitem-icon pi pi-fw" [ngClass]="item.icon"></i>
              <span class="layout-menuitem-text">{{ item.label }}</span>
              <i class="pi pi-fw pi-chevron-down layout-submenu-toggler"></i>
              <span class="p-ink"></span>
          </a>

          <ng-container *ngFor="let subItem of item.items; let subItemIndex = index;">

            <ul role="menu" style="z-index: 100;" [ngStyle]="{ height: item.expanded ? 'unset' : 0 }">
              <ng-container [ngSwitch]="subItem | hasChild">

                  <ng-container *ngSwitchCase="false">
                      <smz-ui-diamond-menu-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-diamond-menu-item>
                  </ng-container>

                  <ng-container *ngSwitchCase="true">
                      <smz-ui-diamond-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-diamond-menu-expandable-item>
                  </ng-container>

              </ng-container>
            </ul>

          </ng-container>

      </li>
  `
})

export class DiamondMenuExpandableItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
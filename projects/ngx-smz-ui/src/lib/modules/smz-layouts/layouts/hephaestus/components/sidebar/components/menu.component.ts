import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'smz-ui-hephaestus-menu-expandable-item',
    template: `
      <li [ngClass]="{ 'active-menuitem': item.expanded }">

          <a [tabindex]="index" (click)="item.expanded = !item.expanded;">
              <i class="layout-menuitem-icon" [ngClass]="item.icon"></i>
              <span class="layout-menuitem-text">{{ item.label }}</span>
              <i class="pi pi-fw pi-chevron-down layout-submenu-toggler"></i>
              <span class="p-ink"></span>
          </a>

          <ng-container *ngFor="let subItem of item.items | isVisible; let subItemIndex = index;">

            <ul role="menu" style="z-index: 100;" [ngStyle]="{ height: item.expanded ? 'unset' : 0 }">
              <ng-container [ngSwitch]="subItem | hasChild">

                  <ng-container *ngSwitchCase="false">
                      <smz-ui-hephaestus-menu-item [item]="subItem" [parent]="item" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-item>
                  </ng-container>

                  <ng-container *ngSwitchCase="true">
                      <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
                  </ng-container>

              </ng-container>
            </ul>

          </ng-container>

      </li>
  `,
    standalone: false
})

export class HephaestusMenuExpandableItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}

@Component({
    selector: 'smz-ui-hephaestus-menu-item',
    template: `
      <li [ngClass]="{ 'active-menuitem': currentUrl | urlChecker : item.routerLink }">
        <a class="p-ripple" [ngClass]="{ 'active-route': currentUrl | urlChecker : item.routerLink, 'opacity-50 hover:bg-inherit select-none focus:shadow-none cursor-default': item.disabled }" menuItemAction [item]="item" [parent]="parent" [breadcrumbs]="true" [tabindex]="index">
            <i class="layout-menuitem-icon" [ngClass]="item.icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <span class="p-ink"></span>
        </a>

        <ng-container *ngFor="let subItem of item.items | isVisible">
          <smz-ui-hephaestus-menu-node [item]="subItem" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-node>
        </ng-container>

      </li>
  `,
    standalone: false
})

export class HephaestusMenuItemComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public parent: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}

@Component({
    selector: 'smz-ui-hephaestus-menu-node',
    template: `
      <ul role="menu" style="z-index: 100;">

          <ng-container *ngFor="let subItem of item.items | isVisible; let subItemIndex = index;">

              <ng-container [ngSwitch]="subItem | hasChild">

                  <ng-container *ngSwitchCase="false">
                      <smz-ui-hephaestus-menu-item [item]="subItem" [parent]="item" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-item>
                  </ng-container>

                  <ng-container *ngSwitchCase="true">
                      <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
                  </ng-container>

              </ng-container>

          </ng-container>

      </ul>
  `,
    standalone: false
})

export class HephaestusMenuNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}

@Component({
    selector: '[smz-ui-hephaestus-menu-slim-node]',
    template: `
    <ng-container *ngFor="let subItem of item.items | isVisible; let last = last; let subItemIndex = index;">

        <ng-container [ngSwitch]="subItem | hasChild">

            <ng-container *ngSwitchCase="false">
                <li [ngClass]="{ 'active-menuitem': currentUrl | urlChecker : subItem.routerLink }">
                    <a class="p-ripple" [tabindex]="subItemIndex" menuItemAction [item]="subItem" [parent]="parent" [breadcrumbs]="true">
                        <i *ngIf="subItem.icon != null" class="layout-menuitem-icon" [ngClass]="subItem.icon"></i>
                        <i *ngIf="subItem.icon == null" class="layout-menuitem-icon pi pi-fw"></i>
                        <span class="layout-menuitem-text">{{ subItem.label }}</span>
                        <span class="p-ink"></span>
                    </a>
                </li>
            </ng-container>

            <ng-container *ngSwitchCase="true">
                <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
            </ng-container>

        </ng-container>

    </ng-container>
  `,
    standalone: false
})

export class HephaestusMenuSlimNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public parent: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
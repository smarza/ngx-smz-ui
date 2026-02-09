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
      
        @for (subItem of item.items | isVisible; track subItem; let subItemIndex = $index) {
          <ul role="menu" style="z-index: 100;" [ngStyle]="{ height: item.expanded ? 'unset' : 0 }">
            @switch (subItem | hasChild) {
              @case (false) {
                <smz-ui-hephaestus-menu-item [item]="subItem" [parent]="item" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-item>
              }
              @case (true) {
                <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
              }
            }
          </ul>
        }
      
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
      
        @for (subItem of item.items | isVisible; track subItem) {
          <smz-ui-hephaestus-menu-node [item]="subItem" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-node>
        }
      
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
      
        @for (subItem of item.items | isVisible; track subItem; let subItemIndex = $index) {
          @switch (subItem | hasChild) {
            @case (false) {
              <smz-ui-hephaestus-menu-item [item]="subItem" [parent]="item" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-item>
            }
            @case (true) {
              <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
            }
          }
        }
      
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
    @for (subItem of item.items | isVisible; track subItem; let last = $last; let subItemIndex = $index) {
      @switch (subItem | hasChild) {
        @case (false) {
          <li [ngClass]="{ 'active-menuitem': currentUrl | urlChecker : subItem.routerLink }">
            <a class="p-ripple" [tabindex]="subItemIndex" menuItemAction [item]="subItem" [parent]="parent" [breadcrumbs]="true">
              @if (subItem.icon != null) {
                <i class="layout-menuitem-icon" [ngClass]="subItem.icon"></i>
              }
              @if (subItem.icon == null) {
                <i class="layout-menuitem-icon pi pi-fw"></i>
              }
              <span class="layout-menuitem-text">{{ subItem.label }}</span>
              <span class="p-ink"></span>
            </a>
          </li>
        }
        @case (true) {
          <smz-ui-hephaestus-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-hephaestus-menu-expandable-item>
        }
      }
    }
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
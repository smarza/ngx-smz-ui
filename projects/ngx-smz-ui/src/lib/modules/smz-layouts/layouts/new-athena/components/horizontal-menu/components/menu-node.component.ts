import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: '[smz-ui-new-athena-horizontal-menu-node]',
    template: `
      @for (subItem of item.items | isVisible; track subItem; let subItemIndex = $index) {
        @switch (subItem | hasChild) {
          @case (false) {
            <li [ngClass]="{ 'active-menuitem': currentUrl | urlChecker : subItem.routerLink }">
              <a class="p-ripple" menuItemAction [item]="subItem" [parent]="item" [breadcrumbs]="true" [tabindex]="subItemIndex" (collapse)="collapse.emit()">
                @if (subItem.icon) {
                  <i class="layout-menuitem-icon" [ngClass]="subItem.icon"></i>
                }
                <span>{{ subItem.label }}</span>
                <span class="p-ink"></span>
              </a>
            </li>
          }
          @case (true) {
            <li [ngClass]="{ 'active-menuitem' : subItem.expanded }">
              <a class="p-ripple" [tabindex]="subItemIndex" (click)="toogleOnly(subItem, subItem.items)">
                @if (subItem.icon) {
                  <i class="layout-menuitem-icon" [ngClass]="subItem.icon"></i>
                }
                <span>{{ subItem.label }}</span>
                <i class="pi pi-fw pi-angle-down layout-menuitem-toggler"></i>
                <span class="p-ink"></span>
              </a>
              @if (subItem.expanded) {
                <ul smz-ui-new-athena-horizontal-menu-node [item]="subItem" [currentUrl]="currentUrl" (collapse)="collapse.emit()"
                role="menu" style="z-index: 100;" class="smz-ui-new-athena-horizontal-menu-node"></ul>
              }
            </li>
          }
        }
      }
      `,
    standalone: false
})

export class NewAthenaHorizontalMenuNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  @Output() public collapse: EventEmitter<void> = new EventEmitter<void>();
  public isAnyMenuExpanded = false;
  constructor() { }

  ngOnInit() { }


  public toogleOnly(item: MenuItem, menu: MenuItem[]): void
  {
    this.collapseAll(menu);

    item.expanded = !item.expanded;
    this.isAnyMenuExpanded = item.expanded;
  }

  public collapseAll(menu: MenuItem[]): void
  {
    menu.forEach(x =>
    {
      x.expanded = false;
      if (x.items != null && x.items.length > 0)
      {
        this.collapseAll(x.items);
      }
    });

    this.isAnyMenuExpanded = false;
  }

}
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: '[smz-ui-apollo-horizontal-menu-node]',
  template: `
      <ng-container *ngFor="let subItem of item.items; let subItemIndex = index;">

          <ng-container [ngSwitch]="subItem | hasChild">

            <ng-container *ngSwitchCase="false">
                <li>
                    <a class="p-ripple" menuItemAction [item]="subItem" [tabindex]="subItemIndex">
                        <i class="layout-menuitem-icon pi pi-fw" [ngClass]="subItem.icon"></i>
                        <span>{{ subItem.label }}</span>
                        <span class="p-ink"></span>
                    </a>
                </li>
            </ng-container>

            <ng-container *ngSwitchCase="true">
                <li [ngClass]="{ 'active-menuitem' : subItem.expanded }">
                    <a class="p-ripple" [tabindex]="subItemIndex" (click)="toogleOnly(subItem, subItem.items)">
                        <i class="layout-menuitem-icon pi pi-fw" [ngClass]="subItem.icon"></i>
                        <span>{{ subItem.label }}</span>
                        <i class="pi pi-fw pi-angle-down layout-menuitem-toggler"></i>
                        <span class="p-ink"></span>
                    </a>

                    <ng-container *ngIf="subItem.expanded">
                      <ul smz-ui-apollo-horizontal-menu-node [item]="subItem" [currentUrl]="currentUrl"
                              role="menu" style="z-index: 100;"></ul>
                    </ng-container>

                </li>
            </ng-container>

          </ng-container>

      </ng-container>
  `,
})

export class ApolloHorizontalMenuNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
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
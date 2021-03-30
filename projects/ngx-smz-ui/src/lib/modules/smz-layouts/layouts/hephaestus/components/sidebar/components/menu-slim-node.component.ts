import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: '[smz-ui-hephaestus-menu-slim-node]',
  template: `
    <ng-container *ngFor="let subItem of item.items | isVisible; let last = last; let subItemIndex = index;">

        <ng-container [ngSwitch]="subItem | hasChild">

            <ng-container *ngSwitchCase="false">
                <li [ngClass]="{ 'active-menuitem': currentUrl === '/' + subItem.routerLink }">
                    <a class="p-ripple" [tabindex]="subItemIndex" menuItemAction [item]="subItem">
                        <i class="layout-menuitem-icon pi pi-fw" [ngClass]="subItem.icon"></i>
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
})

export class HephaestusMenuSlimNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'smz-ui-diamond-menu-node',
  template: `
      <ul role="menu" style="z-index: 100;">

          <ng-container *ngFor="let subItem of item.items; let subItemIndex = index;">

              <ng-container [ngSwitch]="subItem | hasChild">

                  <ng-container *ngSwitchCase="false">
                      <smz-ui-diamond-menu-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-diamond-menu-item>
                  </ng-container>

                  <ng-container *ngSwitchCase="true">
                      <smz-ui-diamond-menu-expandable-item [item]="subItem" [index]="subItemIndex" [currentUrl]="currentUrl"></smz-ui-diamond-menu-expandable-item>
                  </ng-container>

              </ng-container>

          </ng-container>

      </ul>
  `
})

export class DiamondMenuNodeComponent implements OnInit {
  @Input() public item: MenuItem;
  @Input() public index: number;
  @Input() public currentUrl: string;
  constructor() { }

  ngOnInit() { }
}
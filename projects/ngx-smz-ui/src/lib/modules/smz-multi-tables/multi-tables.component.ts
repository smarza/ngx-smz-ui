import { Component, Input, OnInit } from '@angular/core';
import { SmzMultiTablesState, SmzMultiTablesTab } from './multi-tables.state';
import { cloneDeep } from 'lodash-es';
import { generateGUID } from '../../common/utils/guid-generator';

@Component({
    selector: 'smz-ui-multi-tables',
    template: `
<ng-container *ngIf="state != null">


<p-tabs [value]="0" [ngClass]="state.styleClass">
    <p-tablist>
        @for (tab of state.tabs; track $index) {
            <p-tab [value]="$index">
              <i *ngIf="tab.header.icon.isVisible" class="{{ tab.header.icon.name }} mr-2" [ngClass]="tab.header.icon.styleClass"></i>
              <span [innerHTML]="tab.header.label.name | safeHtml"></span>
              <i *ngIf="tab.allowDuplication" class="fa-solid fa-clone cursor-pointer ml-2" (click)="duplicate(tab)"></i>
            </p-tab>
        }
    </p-tablist>
    <p-tabpanels>
        @for (tab of state.tabs; track $index) {
            <p-tabpanel [value]="$index">
              <smz-ui-table *ngIf="tab.table != null" [items]="tab.table.items$ | async" [state]="tab.table.state"></smz-ui-table>
            </p-tabpanel>
        }
    </p-tabpanels>
</p-tabs>

</ng-container>
  `,
    standalone: false
})

export class SmzMultiTablesComponent implements OnInit {
  @Input() public state: SmzMultiTablesState;
  constructor() { }
  ngOnInit() { }
  public duplicate(tab: SmzMultiTablesTab): void {

    const copy = cloneDeep(tab);

    const id = generateGUID();

    copy._isDuplicated = true;
    copy.allowDuplication = false;
    copy.closable = true;
    copy._id = id;

    const count = this.state.tabs
      .filter(s => s._originalId === tab._id)
      .length;

    copy.header.label.name += ` (${count + 1})`;

    this.state.tabs.push(copy);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { SmzMultiTablesState, SmzMultiTablesTab } from './multi-tables.state';
import { cloneDeep } from 'lodash-es';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'smz-ui-multi-tables',
    template: `
<ng-container *ngIf="state != null">

<p-tabView [styleClass]="state.styleClass">

<ng-container *ngFor="let tab of state.tabs">
    <p-tabPanel [ngClass]="tab.styleClass" [selected]="tab.selected" [closable]="tab.closable">
        <ng-template pTemplate="header">
            <i *ngIf="tab.header.icon.isVisible" class="{{ tab.header.icon.name }} mr-2" [ngClass]="tab.header.icon.styleClass"></i>
            <span [innerHTML]="tab.header.label.name | safeHtml"></span>
            <i *ngIf="tab.allowDuplication" class="fa-solid fa-clone cursor-pointer ml-2" (click)="duplicate(tab)"></i>
        </ng-template>
        <smz-ui-table *ngIf="tab.table != null" [items]="tab.table.items$ | async" [state]="tab.table.state"></smz-ui-table>
    </p-tabPanel>
</ng-container>

</p-tabView>

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

    const id = UUID.UUID();

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
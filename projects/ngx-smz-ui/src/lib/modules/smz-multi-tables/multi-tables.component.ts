import { Component, Input, OnInit } from '@angular/core';
import { SmzMultiTablesState } from './multi-tables.state';

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
        </ng-template>
        <smz-ui-table *ngIf="tab.table != null" [items]="tab.table.items$ | async" [state]="tab.table.state"></smz-ui-table>
    </p-tabPanel>
</ng-container>

</p-tabView>

</ng-container>
  `
})

export class SmzMultiTablesComponent implements OnInit {
  @Input() public state: SmzMultiTablesState;
  constructor() { }

  ngOnInit() { }
}
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ColumnFilter } from 'primeng/table';

@Component({
  selector: 'smz-column-filter-2',
  template: `
    <p-columnFilter
      [currency]="currency"
      [display]="display"
      [field]="field"
      [matchMode]="matchMode"
      [showAddButton]="showAddButton"
      [showMatchModes]="showMatchModes"
      [showOperator]="showOperator"
      [type]="type">

      <ng-container *ngIf="headerTemplate">
        <ng-template pTemplate="header">
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </ng-template>
      </ng-container>

      <ng-container *ngIf="filterTemplate">
        <ng-template pTemplate="filter" let-value let-filter="filterCallback">
          <ng-container *ngTemplateOutlet="filterTemplate; context: { $implicit: value, filter: filter }"></ng-container>
        </ng-template>
      </ng-container>

    </p-columnFilter>
`,
})

export class SmzColumnFilter2Component implements AfterContentInit, AfterViewInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @ViewChild(ColumnFilter) public columnFilter: ColumnFilter;
  @Input() public currency: string;
  @Input() public display: string = 'menu';
  @Input() public field: string;
  @Input() public matchMode: string;
  @Input() public showAddButton = true;
  @Input() public showMatchModes = true;
  @Input() public showOperator = true;
  @Input() public type: string = 'text';
  public documentClickListener: any;
  public headerTemplate: TemplateRef<any>;
  public filterTemplate: TemplateRef<any>;

  constructor(public el: ElementRef, public renderer: Renderer2, public cdf: ChangeDetectorRef) { }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'filter':
          this.filterTemplate = item.template;
          break;
      }
    });

  }

  public ngAfterViewInit() {
    this.columnFilter.isOutsideClicked = this.isOutsideClicked;
    this.columnFilter['cdf'] = this.cdf;
  }

  public isOutsideClicked(event): boolean {

    const overlay = this['overlay'];

    const result = !(overlay.isSameNode(event.target) || overlay.contains(event.target));

    if (result) {
      setTimeout(() => {
        this['cdf'].markForCheck();
      }, 0);
    }

    return result;
  }

}
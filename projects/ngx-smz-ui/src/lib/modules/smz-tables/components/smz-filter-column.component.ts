import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ColumnFilter } from 'primeng/table';

@Component({
  selector: 'smz-column-filter',
  template: `
  <div (click)="bindDocumentClickListener()">
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
  <div>`,
})

export class SmzColumnFilterComponent implements AfterContentInit {
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

  constructor(public el: ElementRef, public renderer: Renderer2, private cdf: ChangeDetectorRef) { }

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

  public bindDocumentClickListener() {

    if (!this.documentClickListener) {
      const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

      this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', event => {

        if (this.columnFilter.overlay == null) {
          this.unbindDocumentClickListener();
        }
        else if (this.isOutsideClicked(event)) {
          this.hide();
        }

      });
    }
  }

  public unbindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  public isOutsideClicked(event): boolean {
    return !(this.columnFilter.overlay.isSameNode(event.target) || this.columnFilter.overlay.contains(event.target));
  }

  public hide(): void {
    this.columnFilter.hide();
    this.unbindDocumentClickListener();
    this.cdf.markForCheck();
  }

  public ngOnDestroy(): void {
    this.unbindDocumentClickListener();
  }
}
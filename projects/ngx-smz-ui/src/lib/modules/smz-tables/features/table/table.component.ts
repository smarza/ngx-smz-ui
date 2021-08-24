import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core'
import { PrimeTemplate } from 'primeng/api';
import { SmzContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableState, SmzTableContext } from '../../models/table-state';
import { SmzTableColumn } from '../../models/table-column';
import { SmzEditableType } from '../../models/editable-types';
import { TableEditableService } from '../../services/table-editable.service';
import { TableFormsService } from '../../services/table-forms.service';
import { Table } from 'primeng/table';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableEditableService, TableFormsService]
})
export class SmzTableComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @ViewChild(Table) public table: Table;
  @ViewChild('columnMultiselect') public columnMultiselect: any;
  @Input() public state: SmzTableState;
  @Input() public items: any[] = [];
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public create: EventEmitter<any> = new EventEmitter<any>();
  @Output() public update: EventEmitter<any> = new EventEmitter<any>();
  @Output() public delete: EventEmitter<any> = new EventEmitter<any>();
  public contentTemplate: TemplateRef<any>;
  public editableTemplate: TemplateRef<any>;
  public actionsTemplate: TemplateRef<any>;
  public captionTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public emptyActionsTemplate: TemplateRef<any>;
  public emptyStateTemplate: TemplateRef<any>;
  public selectedItems: any[];
  public selectedColumns: SmzTableColumn[];
  public showSkeleton = false;
  public documentClickListener = null;
  public contentTypes = {
    currency: SmzContentType.CURRENCY,
    calendar: SmzContentType.CALENDAR,
    icon: SmzContentType.ICON,
    text: SmzContentType.TEXT,
    custom: SmzContentType.CUSTOM,
    dataTransform: SmzContentType.DATA_TRANSFORM
  }
  public editableTypes = {
    none: SmzEditableType.NONE,
    custom: SmzEditableType.CUSTOM,
    calendar: SmzEditableType.CALENDAR,
    text: SmzEditableType.TEXT,
    area: SmzEditableType.AREA,
    dropdown: SmzEditableType.DROPDOWN,
    switch: SmzEditableType.SWITCH,
    number: SmzEditableType.NUMBER,
  }
  public filterTypes = {
    boolean: SmzFilterType.BOOLEAN,
    date: SmzFilterType.DATE,
    numeric: SmzFilterType.NUMERIC,
    text: SmzFilterType.TEXT,
    currency: SmzFilterType.CURRENCY,
    dropdown: SmzFilterType.DROPDOWN,
    multiselect: SmzFilterType.MULTI_SELECT
  }
  constructor(public cdr: ChangeDetectorRef, public editableService: TableEditableService, public formsService: TableFormsService, public dialogConfig: SmzDialogsConfig) {
    this.editableService.cdr = this.cdr;
    this.editableService.createEvent = this.create;
    this.editableService.updateEvent = this.update;
    this.editableService.deleteEvent = this.delete;
  }

  public ngOnInit(): void {
  }

  public bind(): void {
  }

  public updateColumnsVisibility(context: SmzTableContext): void {
    this.state.columns.forEach(x => {
      x.isVisible = this.selectedColumns?.findIndex(c => c.field === x.field) !== -1;
    });

    this.state = { ...this.state };

    // context.visibleColumns = context.columns.filter(x => this.selectedColumns.findIndex(c => c.field === x.field) !== -1);
  }

  public hideColumn(column: SmzTableColumn, context: SmzTableContext): void {
    const stateIndex = this.state.columns.findIndex(x => x.field === column.field);
    this.state.columns[stateIndex].isVisible = false;

    const contextIndex = context.columns.findIndex(x => x.field === column.field);
    context.columns[contextIndex].isVisible = false;

    context.visibleColumns = context.visibleColumns.filter(x => x.field !== column.field);

    // this.state = { ...this.state };

    if (this.selectedColumns != null) {
      this.selectedColumns = this.selectedColumns.filter(x => x.field !== column.field);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.state != null) {

      const newState: SmzTableState = changes.state.currentValue;

      if (newState != null) {
        if (!newState.caption?.rowSelection?.isButtonVisible) {
          this.selectedItems = [];
        }
      }
      else {
        this.selectedItems = [];
      }

      this.populateColumnVisibility(newState);

      this.editableService.state = this.state;
      this.formsService.state = this.state;

      this.editableService.setupAccess();

      this.cdr.markForCheck();
    }

    if (changes.items != null) {

        setTimeout(() => {
          if (this.table != null && this.table.onPageChange != null) {
            // ATUALIZAR PAGINA ATUAL NO PAGINADOR DO PRIME
            this.table.onPageChange(this.state.pagination.state);

            // PROPAGAR ALTERAÇÕES
            this.cdr.markForCheck();
          }
        }, 0);

    }

  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'editable':
          this.editableTemplate = item.template;
          break;

        case 'actions':
          this.actionsTemplate = item.template;
          break;

        case 'caption':
          this.captionTemplate = item.template;
          break;

        case 'toolbar':
          this.toolbarTemplate = item.template;
          break;

        case 'emptyActions':
          this.emptyActionsTemplate = item.template;
          break;

        case 'emptyState':
          this.emptyStateTemplate = item.template;
          break;
      }
    });
  }

  public populateColumnVisibility(newState: SmzTableState): void {
    this.selectedColumns = newState?.columns.filter(x => x.isVisible) ?? [];
  }

  public clear(dt: any, context: SmzTableContext): void {
    dt.clear();

    if (context.state.caption?.clearFilters?.callback != null) {
      context.state.caption.clearFilters.callback();
    }
  }

  public onRowSelection(context: SmzTableContext): void {
    context.state.caption.rowSelection.isEnabled = !context.state.caption.rowSelection.isEnabled;

    if (context.state.caption.rowSelection.callback != null) {
      context.state.caption.rowSelection.callback();
    }
  }

  public onPage(event: { first: number, rows: number }): void {
    this.state.pagination.state = event;
  }

}

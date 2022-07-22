import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ExportableContentTypeOf, SmzContentType, SmzDataTransform, SmzExportableContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableState, SmzTableContext } from '../../models/table-state';
import { SmzTableColumn } from '../../models/table-column';
import { SmzEditableType } from '../../models/editable-types';
import { TableEditableService } from '../../services/table-editable.service';
import { TableFormsService } from '../../services/table-forms.service';
import { Table } from 'primeng/table';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { uuidv4 } from '../../../../common/utils/utils';
import { TableHelperService } from '../../services/table-helper.service';
import { SmzExportableColumn, SmzExportDialogData } from '../../../smz-export-dialog/smz-export-dialog.model';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngxs/store';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { SmzExcelService } from '../../../smz-excels/services/smz-excel-service';
import { SmzExcelsBuilder } from '../../../../builders/smz-excels/excels-builder';
import { SmzCreateExcelTable } from '../../../smz-excels/models/smz-excel-table';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { SmzExcelFontDefinitions, SmzExcelThemeDefinitions } from '../../../smz-excels/models/smz-excel-definitions';
import { ObjectUtils } from 'primeng/utils';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableEditableService, TableFormsService]
})
export class SmzTableComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  public tableKey = uuidv4();
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @ViewChild(Table) public table: Table;
  @ViewChild('columnMultiselect') public columnMultiselect: any;
  @Input() public state: SmzTableState;
  @Input() public items: any[] = [];
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public filterChange: EventEmitter<any> = new EventEmitter<any>();
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
  public rowContentTemplate: TemplateRef<any>;
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
    multiselect: SmzFilterType.MULTI_SELECT,
    multiselect_array: SmzFilterType.MULTI_SELECT_ARRAY
  }
  constructor(public cdr: ChangeDetectorRef, public editableService: TableEditableService, public formsService: TableFormsService, public dialogConfig: SmzDialogsConfig, private tableHelper: TableHelperService, private store: Store, private smzExcelService: SmzExcelService) {
    this.editableService.cdr = this.cdr;
    this.editableService.createEvent = this.create;
    this.editableService.updateEvent = this.update;
    this.editableService.deleteEvent = this.delete;
  }

  public ngOnInit(): void {
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

      // Se estiver com a validação desligada, considerar tabela como válida
      this.state.isValid = newState.caption.rowSelection.validationMode === 'none';

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

        case 'rowContent':
          this.rowContentTemplate = item.template;
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

  public exportToPdf(context: SmzTableContext, items: any[]): void {
    const exportData: SmzExportDialogData = {
      title: context.state.caption.title,
      filename: context.state.caption.title,
      columns: context.columns
        .filter(x => x.isExportable)
        .map(x => ({
          field: x.field,
          header: x.header,
          isDataTransform: x.content.type === SmzContentType.DATA_TRANSFORM,
          callback: x.content.type === SmzContentType.DATA_TRANSFORM ? (x.content.data as SmzDataTransform).callback : null,
          type: x.content.exportAs ? x.content.exportAs : ExportableContentTypeOf[x.content.type]
        })),
      items: cloneDeep(items)
    };

    this.store.dispatch(new LayoutUiActions.ShowExportDialog(exportData));
  }

  public exportToExcel(table: Table, context: SmzTableContext, items: any[]): void {

    const username = this.store.selectSnapshot(AuthenticationSelectors.username);

    const columns = context.visibleColumns
      .filter(x => x.isExportable)
      .map(x => ({
        field: x.field,
        header: x.header,
        isDataTransform: x.content.type === SmzContentType.DATA_TRANSFORM,
        callback: x.content.type === SmzContentType.DATA_TRANSFORM ? (x.content.data as SmzDataTransform).callback : null,
        type: x.content.exportAs ? x.content.exportAs : ExportableContentTypeOf[x.content.type]
      }));

    const visibleItems = table.filteredValue?.length > 0 ? table.filteredValue : items;
    const plainItems = cloneDeep(visibleItems).map((item, index) => (this.convertExportableItem(columns, item, index)));

    const data: SmzCreateExcelTable = new SmzExcelsBuilder()
      .setFilename(this.state.caption.title)
      .setAuthor(username)
      .sheet(this.state.caption.title)
        .table()
          .headerStyles()
            .setFont(SmzExcelFontDefinitions.Calibri)
            .setFontSize(14)
            .enableBold()
            .apply
          .setTheme(SmzExcelThemeDefinitions.TableStyleLight20)
          .columns()
            .for(columns, (_, column: SmzExportableColumn) => {

              const normalizedField = column.field.replace(/\.+/g, '');

              switch (column.type) {
                case SmzExportableContentType.TEXT:
                  return _.text(column.header, normalizedField)
                  .column

                case SmzExportableContentType.NUMBER:
                  return _
                    .number(column.header, normalizedField)
                      .setFormat('R$ 00.0')
                    .column

                default:
                  return _;
              }

            })
            .setData(plainItems)
            .table
          .sheets
        .excels
      .build();

    this.smzExcelService.generate(data);

  }

  private convertExportableItem(columns: SmzExportableColumn[], item: any, index: number): any {
    const result = {};

    columns.forEach(column => {

      const normalizedField = column.field.replace(/\.+/g, '');

      if (column.isDataTransform) {
        result[normalizedField] = column.callback(this.resolveData(item, column.field).result, item, index);
      }
      else {
        result[normalizedField] = this.resolveData(item, column.field).result;
      }

    });

    return result;
  }

  private resolveData(data: any, field: string): { result: string } {
    if (data == null) return { result: '' };
    return { result: ObjectUtils.resolveFieldData(data, field) };
  }

  public onRowSelection(context: SmzTableContext): void {
    context.state.caption.rowSelection.isEnabled = !context.state.caption.rowSelection.isEnabled;

    if (context.state.caption.rowSelection.callback != null) {
      context.state.caption.rowSelection.callback(this.selectedItems);
    }
  }

  public onPage(event: { first: number, rows: number }): void {
    this.state.pagination.state = event;
  }

  public emitSelection(event: any[]): void {
    this.selectionChange.emit(event);

    if (this.state.caption.rowSelection.isEnabled) {
      if (this.state.caption.rowSelection.callback != null) {
        this.state.caption.rowSelection.callback(this.selectedItems);
      }
    }

    if (this.state.caption.rowSelection.validationMode === 'required') {
      this.state.isValid = event.length > 0;
    }
  }

  public onFilter(event: any): void {
    this.filterChange.emit(event);
  }

  public ngOnDestroy(): void {
    this.tableHelper.clear(this.tableKey);
  }

}

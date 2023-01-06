import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, OnDestroy, inject, DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, AfterViewInit } from '@angular/core';
import { PrimeTemplate, FilterMetadata } from 'primeng/api';
import { SmzContentType, SmzExportableContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableState, SmzTableContext, SmzTableViewportState } from '../../models/table-state';
import { SmzTableColumn } from '../../models/table-column';
import { SmzEditableType } from '../../models/editable-types';
import { TableEditableService } from '../../services/table-editable.service';
import { TableFormsService } from '../../services/table-forms.service';
import { Table } from '../../../prime/table/table';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { shorten, uuidv4 } from '../../../../common/utils/utils';
import { TableHelperService } from '../../services/table-helper.service';
import { SmzExportableColumn, SmzExportDialogData } from '../../../smz-export-dialog/smz-export-dialog.model';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngxs/store';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { SmzExcelService } from '../../../smz-excels/services/smz-excel-service';
import { SmzExcelsBuilder } from '../../../../builders/smz-excels/excels-builder';
import { SmzExcelState } from '../../../smz-excels/models/smz-excel-table';
import { AuthenticationSelectors } from '../../../../state/global/authentication/authentication.selectors';
import { SmzExcelFontDefinitions, SmzExcelThemeDefinitions } from '../../../smz-excels/models/smz-excel-definitions';
import { ObjectUtils } from 'primeng/utils';
import { SmzLayoutsConfig } from '../../../smz-layouts/core/globals/smz-layouts.config';
import { isBoolean, keyBy } from 'lodash-es';
import { ApplicationActions } from '../../../../state/global/application/application.actions';
import { isEmpty } from '../../../../builders/common/utils';
import { filter } from 'rxjs';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableEditableService, TableFormsService]
})
export class SmzTableComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  public tableKey = uuidv4();
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @ViewChild('dt') public table: Table;
  @ViewChild('columnMultiselect') public columnMultiselect: any;
  @Input() public state: SmzTableState;
  @Input() public items: any[] = [];
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public columnVisibilityChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() public create: EventEmitter<any> = new EventEmitter<any>();
  @Output() public update: EventEmitter<any> = new EventEmitter<any>();
  @Output() public delete: EventEmitter<any> = new EventEmitter<any>();
  public globalSearchInput = '';
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
  private isViewInit = false;
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
  constructor(
    public cdr: ChangeDetectorRef,
    public editableService: TableEditableService,
    public formsService: TableFormsService, public dialogConfig: SmzDialogsConfig, private tableHelper: TableHelperService,
    private store: Store, private smzExcelService: SmzExcelService, private layoutConfig: SmzLayoutsConfig) {
    this.editableService.cdr = this.cdr;
    this.editableService.createEvent = this.create;
    this.editableService.updateEvent = this.update;
    this.editableService.deleteEvent = this.delete;
  }

  public ngOnInit(): void {
  }

  public InitCreation(): void {
    this.editableService.onRowCreateInit(this.table, this.state.columns);
    this.cdr.markForCheck();
  }

  public updateGlobalFilter(value: string): void {
    this.table.filterGlobal(value, 'contains');
  }

  public updateColumnsVisibility(): void {
    this.state.columns.forEach(x => {
      x.isVisible = this.selectedColumns?.findIndex(c => c.field === x.field) !== -1;
    });

    this.state = { ...this.state };

    this.columnVisibilityChange.emit(
      this.state.columns
        .filter(x => x.isVisible)
        .map(x => x.field)
      );
  }

  public hideColumn(column: SmzTableColumn, context: SmzTableContext): void {
    const stateIndex = this.state.columns.findIndex(x => x.field === column.field);
    this.state.columns[stateIndex].isVisible = false;

    const contextIndex = context.columns.findIndex(x => x.field === column.field);
    context.columns[contextIndex].isVisible = false;

    context.visibleColumns = context.visibleColumns.filter(x => x.field !== column.field);

    if (this.selectedColumns != null) {
      this.selectedColumns = this.selectedColumns.filter(x => x.field !== column.field);
    }
  }

  public ngAfterViewInit(): void
  {
    this.initializeState();
  }

  public initializeState(): void {
    if (this.state?.viewport?.state != null) {
      // Executar atualização da viewport com dados default de pesquisa global, filtros de coluna e ordenação
      this.initViewportPersistence();
    }

    // Popular a variavel contendo as colunas visiveis
    this.populateColumnVisibility(this.state);

    // Atualizar o isVisible nas colunas do state
    this.updateColumnsVisibility();

    this.editableService.state = this.state;
    this.formsService.state = this.state;

    this.editableService.setupAccess();

    this.isViewInit = true;
    this.cdr.markForCheck();
  }

  public extractViewportState(): SmzTableViewportState {

    const results: SmzTableViewportState = {
      isEnabled: true,
      filters: this.table.filters,
      visibility: this.selectedColumns.map(x => ({ key: x.field, isVisible: true })),
      sort: { mode: 'single', field: this.table.sortField, order: this.table.sortOrder }
    };

    return results;
  }

  public initViewportPersistence(): void {
    if (this.state?.viewport?.state?.isEnabled === false) {
      return;
    }

    const state = this.state.viewport.state;

    this.globalSearchInput = '';
    this.table.clear();

    const globalFilter = state.filters['global'] as FilterMetadata;
    // Global Filter
    if (globalFilter != null) {
      this.globalSearchInput = globalFilter.value;
      this.table.filterGlobal(globalFilter.value, globalFilter.matchMode);
    }

    // Column Filters
    if (state.filters != null) {
      this.table.filters = state.filters;
    }

    // Column Visibility
    this.state.columns.forEach(column => {
      const visibilityData = state.visibility.find(x => x.key === column.field) ?? { key: column.field, isVisible: false };
      column.isVisible = visibilityData.isVisible;
    });

    if (state.sort != null) {

      this.table.sortMode = 'single';
      this.table.sortField = state.sort.field;
      this.table.sortOrder = state.sort.order;

      if (this.table.resetPageOnSort) {
        this.table.first = 0;
        this.table.firstChange.emit(this.table.first);

        if (this.table.scrollable) {
            this.table.resetScrollTop();
        }
    }

      this.table.sortSingle();

    }

  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.state != null) {

      const newState: SmzTableState = changes.state.currentValue;

      if (newState != null) {

        if (!newState.caption?.rowSelection?.isButtonVisible) {
          this.selectedItems = [];
        }

        // Se estiver com a validação desligada, considerar tabela como válida
        this.state.isValid = newState.caption.rowSelection.validationMode === 'none';

        if (this.isViewInit) {
          this.initializeState();
        }

      }
      else {
        this.selectedItems = [];
      }

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
    this.globalSearchInput = '';

    dt.clear();

    if (context.state.caption?.clearFilters?.callback != null) {
      context.state.caption.clearFilters.callback();
    }

    this.cdr.markForCheck();
  }

  public exportToPdf(context: SmzTableContext, items: any[]): void {
    const exportData: SmzExportDialogData = {
      title: context.state.caption.title,
      filename: context.state.caption.title,
      columns: context.columns
        .filter(x => x.export.isExportable)
        .map(x => ({
          field: x.field,
          header: x.header,
          callback: x.export.dataCallback,
          type: x.export.exportAs
        })),
      items: cloneDeep(items)
    };

    this.store.dispatch(new LayoutUiActions.ShowExportDialog(exportData));
  }

  public exportToExcel(table: Table, context: SmzTableContext, items: any[]): void {

    this.store.dispatch(new ApplicationActions.StartGlobalLoading());

    setTimeout(() => {

      const username = this.store.selectSnapshot(AuthenticationSelectors.username);

      const columns = context.visibleColumns
        .filter(x => x.export.isExportable)
        .map(x => ({
          field: x.field,
          header: x.header,
          callback: x.export.dataCallback,
          type: x.export.exportAs
        }));

      const visibleItems = table.filteredValue?.length > 0 ? table.filteredValue : items;
      const plainItems = cloneDeep(visibleItems).map((item, index) => (this.getExportableData(columns, item, index)));
      const excel = context.state.caption.exportToExcel;
      const filename = shorten(excel.filename, excel.maxFilenameLength, excel.maxFilenameShortenSuffix);

      const data: SmzExcelState = new SmzExcelsBuilder()
        .setFilename(filename)
        .if(excel.includeUserAsAuthor)
          .setAuthor(username)
          .endIf
        .if(this.state.isDebug)
          .debugMode()
          .endIf
        .if(this.layoutConfig.appName != null)
          .setCompany(this.layoutConfig.appName)
          .endIf
        .if(this.layoutConfig.footer?.leftSideText != null)
          .setComments(this.layoutConfig.footer?.leftSideText)
          .endIf
        .if(excel?.globalDateFormat != null)
          .setGlobalDateFormat(excel?.globalDateFormat)
          .endIf
        .if(excel?.globalNewLineSeparator != null)
          .setGlobalNewLineSeparator(excel?.globalNewLineSeparator)
          .endIf
        .if(excel?.exportHyperLinkAsHtml)
          .setGlobalHyperlinkAsHtml()
          .endIf
        .sheet(this.state.caption.title)
          .table()
            .headers()
              .setFont(SmzExcelFontDefinitions.Calibri)
              .setFontSize(14)
              .enableBold()
              .apply
            .setTheme(SmzExcelThemeDefinitions.TableStyleLight20)
            .columns()
              .for(columns, (_, column: SmzExportableColumn) => {

                const normalizedField = column.field.replace(/\.+/g, '');

                switch (column.type) {
                  case SmzExportableContentType.AUTODETECT:
                    return _
                      .auto(column.header, normalizedField)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .column

                  case SmzExportableContentType.TEXT:
                    return _
                      .text(column.header, normalizedField)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .column

                  case SmzExportableContentType.NUMBER:

                    return _
                      .number(column.header, normalizedField)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .column

                  case SmzExportableContentType.BOOLEAN:

                    return _
                      .text(column.header, normalizedField)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .column

                  case SmzExportableContentType.HYPERLINK:

                    return _
                      .hyperlink(column.header, normalizedField)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
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

      this.store.dispatch(new ApplicationActions.StopGlobalLoading());

      this.smzExcelService.generate(data);
    }, 200);
  }

  private getExportableData(columns: SmzExportableColumn[], item: any, index: number): any {

    const results = {};

    columns.forEach(column => {

      const normalizedField = column.field.replace(/\.+/g, '');
      const resolve = this.resolveData(item, column.field).result;
      const result = column.callback(resolve, item, index);

      switch (column.type) {
        case SmzExportableContentType.BOOLEAN:
          results[normalizedField] = isBoolean(result) ? result : '';
          break;
        case SmzExportableContentType.TEXT:
          results[normalizedField] = result?.toString() ?? '';
          break;
        case SmzExportableContentType.HYPERLINK:
          try {
            const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gm;
            const matches = [];
            let match;

            while (match = regex.exec((result as string).toString())) {
              matches.push(match[1]);
            }

            if (matches.length > 0) {
              results[normalizedField] = matches.join(';');
            }
            else {
              results[normalizedField] = '';
            }
          } catch (error) {
            console.warn(`Could not perform regex on the hyperlink ${column.field}`);
          }

          break;
        case SmzExportableContentType.NONE:
          results[normalizedField] = '';
          break;
        default:
          results[normalizedField] = result;
          break;
      }

    });

    return results;
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

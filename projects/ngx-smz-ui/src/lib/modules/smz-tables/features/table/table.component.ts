import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { PrimeTemplate, FilterMetadata } from 'primeng/api';
import { SmzContentType, SmzExportableContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableState, SmzTableContext, SmzTableViewportStateData } from '../../models/table-state';
import { SmzTableColumn } from '../../models/table-column';
import { SmzEditableType } from '../../models/editable-types';
import { TableEditableService } from '../../services/table-editable.service';
import { TableFormsService } from '../../services/table-forms.service';
// import { Table } from '../../../prime/table/table';
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
import { isBoolean } from 'lodash-es';
import { ApplicationActions } from '../../../../state/global/application/application.actions';
import { GlobalInjector } from '../../../../common/services/global-injector';
import { Table } from 'primeng/table';

@Component({
    selector: 'smz-ui-table',
    templateUrl: './table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableEditableService, TableFormsService],
    standalone: false
})
export class SmzTableComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  public uiConfig = GlobalInjector.config;
  public tableKey = uuidv4();
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @ViewChild('dt') public table: Table<any>;
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
  public selectedColumns: SmzTableColumn[] = [];
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
    multiselect_array: SmzFilterType.MULTI_SELECT_ARRAY,
    multiselect_string: SmzFilterType.MULTI_SELECT_STRING
  }

  constructor(
    public cdr: ChangeDetectorRef,
    public editableService: TableEditableService,
    public formsService: TableFormsService, private tableHelper: TableHelperService,
    private store: Store, private smzExcelService: SmzExcelService) {
    this.editableService.cdr = this.cdr;
    this.editableService.createEvent = this.create;
    this.editableService.updateEvent = this.update;
    this.editableService.deleteEvent = this.delete;
  }

  public ngOnInit(): void {
  }

  public hasFilters(): boolean {
    for (let key in this.table?.filters) {
      let filter = this.table.filters[key];
      if (Array.isArray(filter)) {
        for (let subFilter of filter) {
          if (subFilter.value !== null) {
            return true;
          }
        }
      } else {
        if (filter.value !== null) {
          return true;
        }
      }
    }
    return false;
  }

  public InitCreation(): void {
    this.editableService.onRowCreateInit(this.table, this.state.columns);
    this.cdr.markForCheck();
  }

  public updateGlobalFilter(value: string): void {
    this.table.filterGlobal(value, 'contains');
  }

  public updateColumnsVisibility(triggerViewport: boolean): void {
    this.state.columns.forEach(x => {
      x.isVisible = this.selectedColumns?.findIndex(c => c.field === x.field) !== -1;
    });

    this.state = { ...this.state };

    this.columnVisibilityChange.emit(
      this.state.columns
        .filter(x => x.isVisible)
        .map(x => x.field)
      );

      if(triggerViewport) {
        this.viewportChange();
      }
  }

  public hideColumn(column: SmzTableColumn, context: SmzTableContext): void {
    const stateIndex = this.state.columns.findIndex(x => x.field === column.field);
    this.state.columns[stateIndex].isVisible = false;

    const contextIndex = context.columns.findIndex(x => x.field === column.field);
    context.columns[contextIndex].isVisible = false;

    context.visibleColumns = context.visibleColumns.filter(x => x.field !== column.field);

    this.selectedColumns = this.selectedColumns.filter(x => x.field !== column.field);
  }

  public ngAfterViewInit(): void
  {
    setTimeout(() => {
      this.initializeState();
    }, 0);
  }

  public initializeState(): void {

    if (this.state == null) {
      return ;
    }

    // Popular a variavel contendo as colunas visiveis
    this.populateColumnVisibility(this.state);

    if (this.state.viewport?.state?.isEnabled) {

      switch (this.state.viewport?.state?.persistance) {
        case 'auto':
          this.loadViewportFromLocalStorage();
          break;
        case 'manual':
          this.loadViewportFromManualCallback();
          break;
        default:
          break;
      }

      // Executar atualização da viewport com dados default de pesquisa global, filtros de coluna e ordenação
      this.initViewportState();

    }

    // Atualizar o isVisible nas colunas do state
    this.updateColumnsVisibility(false);

    this.editableService.state = this.state;
    this.formsService.state = this.state;

    this.editableService.setupAccess();

    this.isViewInit = true;
    this.cdr.markForCheck();
  }

  public extractViewportStateData(): SmzTableViewportStateData {

    const results: SmzTableViewportStateData = {
      filters: this.table.filters,
      visibility: this.state.columns.map(x => {
        const selectedColumn = this.selectedColumns.find(s => s.field === x.field);
        return { key: x.field, isVisible: selectedColumn != null };
      }),
      sort: { mode: 'single', field: this.table.sortField, order: this.table.sortOrder }
    };

    return results;
  }

  public initViewportState(): void {
    if (this.state.viewport.state?.data == null) {
      return;
    }

    const state = this.state.viewport.state;

    this.globalSearchInput = '';
    this.table.clear();

    const globalFilter = state.data.filters['global'] as FilterMetadata;
    // Global Filter
    if (globalFilter != null) {
      this.globalSearchInput = globalFilter.value;
      this.table.filterGlobal(globalFilter.value, globalFilter.matchMode);
    }

    // Column Filters
    if (state.data.filters != null) {
      this.table.filters = state.data.filters;
    }

    // Column Visibility
    this.state.columns.forEach(column => {
      const visibilityData = state.data.visibility.find(x => x.key === column.field);
      if (visibilityData != null) {
        column.isVisible = visibilityData.isVisible;
      }
    });

    // Popular a variavel contendo as colunas visiveis
    this.populateColumnVisibility(this.state);

    if (state.data.sort != null) {

      this.table.sortMode = 'single';
      this.table.sortField = state.data.sort.field;
      this.table.sortOrder = state.data.sort.order;

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

    if (changes['state'] != null) {

      const newState: SmzTableState = changes['state'].currentValue;

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

    if (changes['items'] != null) {

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

    this.viewportChange();

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
          header: x.export.header,
          callback: x.export.dataCallback,
          type: x.export.exportAs,
          isMultilined: x.export.isMultilined,
          newLineSeparator: x.export.newLineSeparator,
          dataFormat: x.export.dataFormat
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
          header: x.export.header,
          callback: x.export.dataCallback,
          type: x.export.exportAs,
          isMultilined: x.export.isMultilined,
          newLineSeparator: x.export.newLineSeparator,
          dataFormat: x.export.dataFormat
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
        .if(this.uiConfig.layouts.appName != null)
          .setCompany(this.uiConfig.layouts.appName)
          .endIf
        .if(this.uiConfig.layouts.footer?.leftSideText != null)
          .setComments(this.uiConfig.layouts.footer?.leftSideText)
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
        .sheet(excel?.sheetName)
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
                      .auto(normalizedField, column.header)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .if(column.isMultilined)
                          .setAsMultilined(column.newLineSeparator)
                          .endIf
                        .column

                    case SmzExportableContentType.DATETIME:
                      return _
                        .date(normalizedField, column.header)
                          .if(this.state.styles.columnsWidth?.maxWidth != null)
                            .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                            .endIf
                          .if(column.isMultilined)
                            .setAsMultilined(column.newLineSeparator)
                            .endIf
                          .setDateFormat(column.dataFormat)
                          .column

                  case SmzExportableContentType.TEXT:
                    return _
                      .text(normalizedField, column.header)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .if(column.isMultilined)
                          .setAsMultilined(column.newLineSeparator)
                          .endIf
                        .column

                  case SmzExportableContentType.NUMBER:

                    return _
                      .number(normalizedField, column.header)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .if(column.isMultilined)
                          .setAsMultilined(column.newLineSeparator)
                          .endIf
                        .setFormat(column.dataFormat)
                        .column

                  case SmzExportableContentType.BOOLEAN:

                    return _
                      .text(normalizedField, column.header)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .if(column.isMultilined)
                          .setAsMultilined(column.newLineSeparator)
                          .endIf
                        .column

                  case SmzExportableContentType.HYPERLINK:

                    return _
                      .hyperlink(normalizedField, column.header)
                        .if(this.state.styles.columnsWidth?.maxWidth != null)
                          .setMaxWidthInPixels(this.state.styles.columnsWidth.maxWidth)
                          .endIf
                        .if(column.isMultilined)
                          .setAsMultilined(column.newLineSeparator)
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
    this.viewportChange();
  }

  public viewportChange(): void {

    if (this.state.viewport.state?.isEnabled) {

      if (this.state.viewport.state.saveTrigger === 'onChange') {
        const viewportData = this.extractViewportStateData();

        switch (this.state.viewport?.state?.persistance) {
          case 'auto':
            this.saveViewportOnLocalStorage(viewportData);
            break;
          case 'manual':
            this.state.viewport.state.manual.saveCallback(viewportData);
            break;
          default:
            break;
        }
      }

      this.state.viewport.state.onChangeCallback(this.extractViewportStateData());
    }
  }

  public saveViewportOnLocalStorage(data: SmzTableViewportStateData): void {
    localStorage.setItem(this.state.viewport.state.auto.key, JSON.stringify(data));
  }

  public loadViewportFromLocalStorage(): void {
    const viewportStorageData = localStorage.getItem(this.state.viewport.state.auto.key);

    if (viewportStorageData != null) {
      const viewport = JSON.parse(viewportStorageData) as SmzTableViewportStateData;
      this.state.viewport.state.data = viewport;
      this.cdr.markForCheck();
    }
  }

  public loadViewportFromManualCallback(): void {
    const viewportStorageData = this.state.viewport.state.manual.loadCallback();

    if (viewportStorageData != null) {
      const viewport = viewportStorageData;
      this.state.viewport.state.data = viewport;
      this.cdr.markForCheck();
    }
  }

  public ngOnDestroy(): void {

    if (this.state.viewport.state?.isEnabled) {

      if (this.state.viewport.state.saveTrigger === 'onDestroy') {
        const viewportData = this.extractViewportStateData();

        switch (this.state.viewport?.state?.persistance) {
          case 'auto':
            this.saveViewportOnLocalStorage(viewportData);
            break;
          case 'manual':
            this.state.viewport.state.manual.saveCallback(viewportData);
            break;
          default:
            break;
        }
      }

    }

    this.tableHelper.clear(this.tableKey);
  }

}

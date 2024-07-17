import { ObjectUtils } from 'primeng/utils';
import { SmzContentType, SmzCustomContent, SmzDataTransform, SmzExportableContentType, SmzIconContent } from '../../modules/smz-tables/models/content-types';
import { SmzEditableType } from '../../modules/smz-tables/models/editable-types';
import { SmzFilterType } from '../../modules/smz-tables/models/filter-types';
import { SmzTableColumn } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzContentActionsBuilder } from './column-content-action-builder';
import { SmzEditableCollectionBuilder } from './editable-builder';
import { SmzTableBuilder } from './state-builder';
import { GlobalInjector } from '../../common/services/global-injector';
import { LOCALE_ID } from '@angular/core';
import { getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { SmzHeaderActionsBuilder } from './column-header-action-builder';

export abstract class SmzBaseColumnBuilder<T extends SmzBaseColumnBuilder<T, TData>, TData> {
  protected that: T;

  public _column: SmzTableColumn = null;

  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, type: SmzContentType, filterType: SmzFilterType, field: string, header: string, isOrderable: boolean, width: string = 'auto') {

    if (this._table._state.viewport.scrollable && !this._table._state.styles.columnsWidth.estimate && (width === 'auto' || width === 'fit')) {
      throw Error('You need to set a width in pixels for all columns while using \'useScrolling\' method. Or enable the \'useEstimatedColWidth\' method.');
    }

    if (this._table._state.viewport.scrollable && this._table._state.styles.columnsWidth.estimate && width === 'fit') {
      throw Error('You can\'t set width FIT while using \'useEstimatedColWidth\' method. You have to set AUTO or specify a measure value (px, em, rem...).');
    }

    const columnIndex = _table._state.columns.findIndex(c => c.field === field);

    if (columnIndex !== -1) {
      // JÁ EXISTE UMA COLUNA
      this._column = this._table._state.columns[columnIndex];
      this._column.width = width;
      this._column.header = header;
      this._column.content.type = type;
      this._column.content.data = { matches: [] }
    }
    else {
      // NÃO EXISTE A COLUNA AINDA

      this._column = {
        field: field,
        filterField: field,
        sortField: field,
        globalFilterField: field,
        globalFilterDataType: 'string',
        globalFilterArrayDataPath: 'name',
        property: field.split('.')[0],
        header: header,
        headerStyleClass: '',
        hasSubTotal: false,
        content: {
          type: type,
          contentStyleClass: 'grid grid-nogutter items-center justify-start gap-2',
          styleClass: '',
          data: { matches: [] },
          ngStyle: {},
        },
        export: {
          exportAs: undefined,
          isExportable: true,
          dataCallback: (data, item, index) => {
            return item == null ? '' : ObjectUtils.resolveFieldData(item, field);
          },
          header
        },
        editable: {
          type: SmzEditableType.NONE,
          data: {
            rows: 5,
            options: []
          },
          property: null,
          validatorsPreset: {
            isRequired: false,
          },
          defaultCreationValue: null
        },
        isOrderable,
        filter: {
          isGlobalFilterable: true,
          type: filterType
        },
        isVisible: true,
        isFrozen: false,
        width: width,
        actions: [],
        actionsAlignment: 'end',
        headerActions: [],
        showHeaderActions: false
      };

      this._table._state.columns.push(this._column);

    }

  }

  public overrideFilter(propertyPath?: string, filterType: SmzFilterType = SmzFilterType.TEXT): T {
    this._column.filterField = propertyPath;
    this._column.filter.type = filterType;
    return this.that;
  }

  public overrideSort(propertyPath?: string): T {
    this._column.sortField = propertyPath;
    this._column.isOrderable = true;
    return this.that;
  }

  public overrideGlobalFilter(propertyPath?: string): T {
    this._column.globalFilterField = propertyPath;
    this._column.filter.isGlobalFilterable = true;
    return this.that;
  }

  public disableSort(): T {
    this._column.isOrderable = false;
    return this.that;
  }

  public hide(condition?: boolean): T {
    this._column.isVisible = condition == null ? false : (condition ? false : true);
    return this.that;
  }

  public setVisibility(callback: (field: string) => boolean): T {
    this._column.isVisible = callback(this._column.field);
    return this.that;
  }

  public frozen(): T {
    this._column.isFrozen = true;
    this._table._state.frozen.isEnabled = true;
    return this.that;
  }

  public addStyles(styleClass: string): T {
    this._column.content.styleClass = styleClass;
    return this.that;
  }

  public overideContentStyleClass(styleClass: string): T {
    this._column.content.contentStyleClass = styleClass;
    return this.that;
  }

  public addTooltip(tooltip: (item: any) => string): T {
    this._column.content.tooltip = tooltip;
    return this.that;
  }

  public useSubTotal(): T {
    if (!this._table._state.caption.exportToExcel.isButtonVisible) {
      throw Error('You need to call \'enableExportToExcel\' before');
    }

    this._column.hasSubTotal = true;
    return this.that;
  }

  public ignoreOnGlobalFilter(): T {

    if (!this._column.filter.isGlobalFilterable) {
      throw Error(`You can remove the call ignoreOnGlobalFilter for the field ${this._column.field} because it's already ignored on global filter.`);
    }

    this._column.filter.isGlobalFilterable = false;
    return this.that;
  }

  public disableFilter(): T {
    this._column.filter.type = SmzFilterType.NONE;
    return this.that;
  }

  public ignoreOnExport(): T {
    this._column.export.isExportable = false;
    this._column.export.exportAs = SmzExportableContentType.NONE;
    return this.that;
  }

  public overrideExportHeader(header: string): T {
    this._column.export.header = header;
    return this.that;
  }

  public exportAs(type: SmzExportableContentType): T {

    this._column.export.exportAs = type;

    if (type === SmzExportableContentType.NONE) {
      this._column.export.isExportable = false;
    }
    else {
      this._column.export.isExportable = true;
    }

    return this.that;
  }

  public setExportTransform(callback: (data: any, row: any, index: number) => any): T {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before setExportTransform for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = callback;
    return this.that;
  }

  public setExportAsMultilined(overrideNewlineSeparator?: string): T
  {
    this._column.export.isMultilined = true;
    this._column.export.newLineSeparator = overrideNewlineSeparator;
    return this.that;
  }

  public setExportDataFormat(format: string): T
  {
    this._column.export.dataFormat = format;
    return this.that;
  }

  public editable(): SmzEditableCollectionBuilder<TData> {
    const editableBuilder = new SmzEditableCollectionBuilder(this._table, this);
    return editableBuilder;
  }

  public actions(): SmzContentActionsBuilder<T, TData> {
    return new SmzContentActionsBuilder<T, TData>(this._table, this);
  }

  public headerActions(): SmzHeaderActionsBuilder<T, TData> {
    return new SmzHeaderActionsBuilder<T, TData>(this._table, this);
  }

  public get columns(): SmzColumnCollectionBuilder<TData> {


    if (this._table._state.caption.exportToExcel.isButtonVisible) {

      const columnsWithSameNameCount = this._table._state.columns.filter(x => x.header == this._column.header).length;

      if (columnsWithSameNameCount > 1) {
        throw Error(`You can´t set more than one column with the same header name. ${this._column.header}`);
      }

    }

    const columnsWithSameFieldNameCount = this._table._state.columns.filter(x => x.field == this._column.field).length;

    if (columnsWithSameFieldNameCount > 1) {
      throw Error(`You can´t set more than one column with the same field name. ${this._column.field}`);
    }

    if (this._column.actions.length > 0 && this._column.actionsAlignment === 'begin') {
      this._column.content.styleClass += ' col grid grid-nogutter items-center justify-start';
    }

    return this._parent;
  }
}

export class SmzDateColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzDateColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CALENDAR, SmzFilterType.DATE, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.DATETIME;
    this._column.export.dataFormat = 'dd/MM/yyyy';
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzDateColumnBuilder<TData> {
    if (this._column.content.type !== SmzContentType.CALENDAR) throw new Error('You can set the date for Calendar columns only');
    this._column.content.data = { format };
    return this;
  }

  public setFilter(type: SmzFilterType): SmzDateColumnBuilder<TData> {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzCurrencyColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzCurrencyColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CURRENCY, SmzFilterType.TEXT, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.NUMBER;

    const locale = GlobalInjector.instance.get(LOCALE_ID);
    const numberFormat = '0.00'; // Intl.NumberFormat(this.locale, { style: 'decimal', minimumFractionDigits: 2}).format(0);
    this._column.export.dataFormat = `${getCurrencySymbol(getLocaleCurrencyCode(locale), 'wide', locale)} ${numberFormat}`;
  }

}

export class SmzTextColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzTextColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.TEXT, SmzFilterType.TEXT, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.TEXT;
  }

  public setFilter(type: SmzFilterType): SmzTextColumnBuilder<TData> {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzCustomColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzCustomColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CUSTOM, SmzFilterType.NONE, field, header, false, width);

    this._column.export.exportAs = SmzExportableContentType.NONE;
    this._column.export.isExportable = false;
    this._column.filter.isGlobalFilterable = false;
  }

  public setFilter(type: SmzFilterType): SmzCustomColumnBuilder<TData> {
    this._column.filter.type = type;

    if (type === SmzFilterType.TEXT) {
      this._column.filter.isGlobalFilterable = true;
    }

    if (this._column.filterField !== this._column.field) {
      throw new Error(`You need to overrideFilter after calling setFilter for the field ${this._column.field}`);
    }

    if (this._column.globalFilterField !== this._column.field) {
      throw new Error(`You need to overrideGlobalFilter after calling setFilter for the field ${this._column.field}`);
    }

    this._column.filterField = `_filterable_${this._column.field}`;
    this._column.globalFilterField = `_filterable_${this._column.field}`;

    return this;
  }

  public enableSort(): SmzCustomColumnBuilder<TData> {
    this._column.isOrderable = true;
    return this;
  }

  public forceGlobalFilter(): SmzCustomColumnBuilder<TData> {

    if (this._column.filter.isGlobalFilterable) {
      throw Error(`You can remove the call forceGlobalFilter because the field ${this._column.field} is already on global filter.`);
    }

    this._column.filter.isGlobalFilterable = true;
    return this;
  }

  public setFilterableData(getFilterableDataCallback: (data: any, row: any, index: number) => string): SmzCustomColumnBuilder<TData> {
    (this._column.content.data as SmzCustomContent).getFilterableData = getFilterableDataCallback;
    return this;
  }

}

export class SmzIconColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzIconColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.ICON, SmzFilterType.NONE, field, header, false, width);

    this._column.export.exportAs = SmzExportableContentType.NONE;
    this._column.export.isExportable = false;
    this._column.filter.isGlobalFilterable = false;
  }

  public addIconConfiguration(icon: string, value: any, styleClass: string = null, tooltip: string = null): SmzIconColumnBuilder<TData> {
    if (this._column.content.type !== SmzContentType.ICON) throw new Error('You can use this option for Icon columns only');
    (this._column.content.data as SmzIconContent).matches.push({ icon, value, class: styleClass, tooltip });
    return this;
  }
  public setFilter(type: SmzFilterType): SmzIconColumnBuilder<TData> {
    this._column.filter.type = type;

    if (this._column.filterField !== this._column.field) {
      throw new Error(`You need to overrideFilter after calling setFilter for the field ${this._column.field}`);
    }

    if (this._column.globalFilterField !== this._column.field) {
      throw new Error(`You need to overrideGlobalFilter after calling setFilter for the field ${this._column.field}`);
    }

    this._column.filterField = `_filterable_${this._column.field}`;
    this._column.globalFilterField = `_filterable_${this._column.field}`;

    return this;
  }

  public forceGlobalFilter(): SmzIconColumnBuilder<TData> {

    if (this._column.filter.isGlobalFilterable) {
      throw Error(`You can remove the call forceGlobalFilter because the field ${this._column.field} is already on global filter.`);
    }

    this._column.filter.isGlobalFilterable = true;
    return this;
  }

  public setFilterableData(getFilterableDataCallback: (data: any, row: any, index: number) => string): SmzIconColumnBuilder<TData> {
    (this._column.content.data as SmzIconContent).getFilterableData = getFilterableDataCallback;
    return this;
  }

}

export class SmzDataTransformColumnBuilder<TData> extends SmzBaseColumnBuilder<SmzDataTransformColumnBuilder<TData>, TData> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzColumnCollectionBuilder<TData>, field: string, header: string, callback: (data: any, row: any, index: number) => string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.DATA_TRANSFORM, SmzFilterType.NONE, field, header, false, width);

    (this._column.content.data as SmzDataTransform).callback = callback;

    this._column.export.dataCallback = callback;
    this._column.export.exportAs = SmzExportableContentType.TEXT;
  }

  public setFilter(type: SmzFilterType): SmzDataTransformColumnBuilder<TData> {
    this._column.filter.type = type;

    if (type === SmzFilterType.MULTI_SELECT_ARRAY) {
      this._column.globalFilterDataType = 'array';
    }

    if (this._column.filterField !== this._column.field) {
      throw new Error(`You need to overrideFilter after calling setFilter for the field ${this._column.field}`);
    }

    if (this._column.globalFilterField !== this._column.field) {
      throw new Error(`You need to overrideGlobalFilter after calling setFilter for the field ${this._column.field}`);
    }

    this._column.filterField = `_filterable_${this._column.field}`;
    this._column.globalFilterField = `_filterable_${this._column.field}`;

    return this;
  }

  public ignoreTransformOnExport(): SmzDataTransformColumnBuilder<TData> {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before ignoreTransformOnExport for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = (data, item, index) => {
      return item == null ? '' : ObjectUtils.resolveFieldData(item, this._column.field);
    };
    return this;
  }

  public setFilterableData(getFilterableDataCallback: (data: any, row: any, index: number) => string): SmzDataTransformColumnBuilder<TData> {
    (this._column.content.data as SmzDataTransform).getFilterableData = getFilterableDataCallback;
    return this;
  }

}

export class SmzColumnCollectionBuilder<TData> extends SmzBuilderUtilities<SmzColumnCollectionBuilder<TData>> {
  protected that = this;
  constructor(private _tableBuilder: SmzTableBuilder<TData>) {
    super();
  }

  public text(field: string, header: string, width: string = 'auto'): SmzTextColumnBuilder<TData> {
    return new SmzTextColumnBuilder<TData>(this._tableBuilder, this, field, header, width);
  }

  public custom(field: string, header: string, width: string = 'auto'): SmzCustomColumnBuilder<TData> {
    return new SmzCustomColumnBuilder<TData>(this._tableBuilder, this, field, header, width);
  }

  public icon(field: string, header: string, width: string = 'auto'): SmzIconColumnBuilder<TData> {
    return new SmzIconColumnBuilder<TData>(this._tableBuilder, this, field, header, width);
  }

  public date(field: string, header: string, width: string = 'auto'): SmzDateColumnBuilder<TData> {
    return new SmzDateColumnBuilder<TData>(this._tableBuilder, this, field, header, width);
  }

  public currency(field: string, header: string, width: string = 'auto'): SmzCurrencyColumnBuilder<TData> {
    return new SmzCurrencyColumnBuilder<TData>(this._tableBuilder, this, field, header, width);
  }

  public dataTransform(field: string, header: string, callback: (data: any, row: any, index: number) => string, width: string = 'auto'): SmzDataTransformColumnBuilder<TData> {
    return new SmzDataTransformColumnBuilder<TData>(this._tableBuilder, this, field, header, callback, width);
  }

  public get table(): SmzTableBuilder<TData> {
    return this._tableBuilder;
  }
}
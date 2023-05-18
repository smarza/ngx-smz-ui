import { ObjectUtils } from 'primeng/utils';
import { SmzContentType, SmzDataTransform, SmzExportableContentType, SmzIconContent } from '../../modules/smz-tables/models/content-types';
import { SmzEditableType } from '../../modules/smz-tables/models/editable-types';
import { SmzFilterType } from '../../modules/smz-tables/models/filter-types';
import { SmzTableColumn } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzContentActionsBuilder } from './column-content-action-builder';
import { SmzEditableCollectionBuilder } from './editable-builder';
import { SmzTableBuilder } from './state-builder';

export abstract class SmzBaseColumnBuilder<T extends SmzBaseColumnBuilder<T>> {
  protected that: T;

  public _column: SmzTableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, type: SmzContentType, filterType: SmzFilterType, field: string, header: string, isOrderable: boolean, width: string = 'auto') {

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
          }
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
        actionsAlignment: 'end'
      };

      this._table._state.columns.push(this._column);

    }

  }

  public disableSort(): T {
    this._column.isOrderable = false;
    return this.that;
  }

  public hide(condition?: boolean): T {
    this._column.isVisible = condition == null ? false : (condition ? false : true);
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

  public editable(): SmzEditableCollectionBuilder {
    const editableBuilder = new SmzEditableCollectionBuilder(this._table, this);
    return editableBuilder;
  }

  public actions(): SmzContentActionsBuilder {
    return new SmzContentActionsBuilder(this._table, this);
  }

  public get columns(): SmzColumnCollectionBuilder {


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

export class SmzDateColumnBuilder extends SmzBaseColumnBuilder<SmzDateColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CALENDAR, SmzFilterType.DATE, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.DATETIME;
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzDateColumnBuilder {
    if (this._column.content.type !== SmzContentType.CALENDAR) throw new Error('You can set the date for Calendar columns only');
    this._column.content.data = { format };
    return this;
  }
  public setFilter(type: SmzFilterType): SmzDateColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzCurrencyColumnBuilder extends SmzBaseColumnBuilder<SmzCurrencyColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CURRENCY, SmzFilterType.TEXT, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.NUMBER;
  }

}

export class SmzTextColumnBuilder extends SmzBaseColumnBuilder<SmzTextColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.TEXT, SmzFilterType.TEXT, field, header, true, width);

    this._column.export.exportAs = SmzExportableContentType.TEXT;
  }

  public setFilter(type: SmzFilterType): SmzTextColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzCustomColumnBuilder extends SmzBaseColumnBuilder<SmzCustomColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CUSTOM, SmzFilterType.NONE, field, header, false, width);

    this._column.export.exportAs = SmzExportableContentType.NONE;
    this._column.export.isExportable = false;
    this._column.filter.isGlobalFilterable = false;
  }

  public setFilter(type: SmzFilterType): SmzCustomColumnBuilder {
    this._column.filter.type = type;

    if (type === SmzFilterType.TEXT) {
      this._column.filter.isGlobalFilterable = true;
    }

    return this;
  }

  public enableSort(): SmzCustomColumnBuilder {
    this._column.isOrderable = true;
    return this;
  }

  public setExportTransform(callback: (data: any, row: any, index: number) => any): SmzCustomColumnBuilder {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before setExportTransform for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = callback;
    return this;
  }

  public forceGlobalFilter(): SmzCustomColumnBuilder {

    if (this._column.filter.isGlobalFilterable) {
      throw Error(`You can remove the call forceGlobalFilter because the field ${this._column.field} is already on global filter.`);
    }

    this._column.filter.isGlobalFilterable = true;
    return this;
  }

}

export class SmzIconColumnBuilder extends SmzBaseColumnBuilder<SmzIconColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.ICON, SmzFilterType.NONE, field, header, false, width);

    this._column.export.exportAs = SmzExportableContentType.NONE;
    this._column.export.isExportable = false;
    this._column.filter.isGlobalFilterable = false;
  }

  public addIconConfiguration(icon: string, value: any, styleClass: string = null, tooltip: string = null): SmzIconColumnBuilder {
    if (this._column.content.type !== SmzContentType.ICON) throw new Error('You can use this option for Icon columns only');
    (this._column.content.data as SmzIconContent).matches.push({ icon, value, class: styleClass, tooltip });
    return this;
  }
  public setFilter(type: SmzFilterType): SmzIconColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

  public setExportTransform(callback: (data: any, row: any, index: number) => any): SmzIconColumnBuilder {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before setExportTransform for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = callback;
    return this;
  }

  public forceGlobalFilter(): SmzIconColumnBuilder {

    if (this._column.filter.isGlobalFilterable) {
      throw Error(`You can remove the call forceGlobalFilter because the field ${this._column.field} is already on global filter.`);
    }

    this._column.filter.isGlobalFilterable = true;
    return this;
  }

}

export class SmzDataTransformColumnBuilder extends SmzBaseColumnBuilder<SmzDataTransformColumnBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, callback: (data: any, row: any, index: number) => string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.DATA_TRANSFORM, SmzFilterType.NONE, field, header, false, width);

    (this._column.content.data as SmzDataTransform).callback = callback;

    this._column.export.dataCallback = callback;
    this._column.export.exportAs = SmzExportableContentType.TEXT;
  }

  public setFilter(type: SmzFilterType): SmzDataTransformColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

  public setExportTransform(callback: (data: any, row: any, index: number) => any): SmzDataTransformColumnBuilder {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before setExportTransform for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = callback;
    return this;
  }

  public ignoreTransformOnExport(): SmzDataTransformColumnBuilder {

    if (this._column.export.exportAs === SmzExportableContentType.NONE) {
      throw new Error(`You need to setExportAs before ignoreTransformOnExport for the field ${this._column.field}`);
    }

    this._column.export.dataCallback = (data, item, index) => {
      return item == null ? '' : ObjectUtils.resolveFieldData(item, this._column.field);
    };
    return this;
  }

}

export class SmzColumnCollectionBuilder extends SmzBuilderUtilities<SmzColumnCollectionBuilder> {
  protected that = this;
  constructor(private _tableBuilder: SmzTableBuilder) {
    super();
  }

  public text(field: string, header: string, width: string = 'auto'): SmzTextColumnBuilder {
    return new SmzTextColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public custom(field: string, header: string, width: string = 'auto'): SmzCustomColumnBuilder {
    return new SmzCustomColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public icon(field: string, header: string, width: string = 'auto'): SmzIconColumnBuilder {
    return new SmzIconColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public date(field: string, header: string, width: string = 'auto'): SmzDateColumnBuilder {
    return new SmzDateColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public currency(field: string, header: string, width: string = 'auto'): SmzCurrencyColumnBuilder {
    return new SmzCurrencyColumnBuilder(this._tableBuilder, this, field, header, width);
  }

  public dataTransform(field: string, header: string, callback: (data: any, row: any, index: number) => string, width: string = 'auto'): SmzDataTransformColumnBuilder {
    return new SmzDataTransformColumnBuilder(this._tableBuilder, this, field, header, callback, width);
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }
}
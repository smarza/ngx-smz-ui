import { SmzContentType, SmzDataTransform, SmzIconContent } from '../models/content-types';
import { SmzEditableType } from '../models/editable-types';
import { SmzFilterType } from '../models/filter-types';
import { SmzTableColumn } from '../models/table-column';
import { SmzEditableCollectionBuilder } from './editable-builder';
import { SmzTableBuilder } from './state-builder';


export abstract class SmzBaseColumnBuilder<T extends SmzBaseColumnBuilder<T>> {

  public _column: SmzTableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, type: SmzContentType, filterType: SmzFilterType, field: string, header: string, isOrderable: boolean, width: string = 'auto') {

    const columnIndex = _table._state.columns.findIndex(c => c.field === field);

    if (columnIndex !== -1) {
        // JÁ EXISTE UMA COLUNA
        this._column = this._table._state.columns[columnIndex];
        this._column.width = width;
        this._column.header = header;
    }
    else {
        // NÃO EXISTE A COLUNA AINDA

        this._column = {
          field: field,
          property: field.split('.')[0],
          header: header,
          content: {
            type: type,
            data: { matches: [] }
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
            }
          },
          isOrderable,
          filter: {
            isGlobalFilterable: true,
            type: filterType
          },
          isVisible: true,
          width: width
        };

        this._table._state.columns.push(this._column);

    }

  }

  public disableSort(): SmzBaseColumnBuilder<T> {
    this._column.isOrderable = false;
    return this;
  }

  public hide(): SmzBaseColumnBuilder<T> {
    this._column.isVisible = false;
    return this;
  }

  public ignoreOnGlobalFilter(): SmzBaseColumnBuilder<T> {
    this._column.filter.isGlobalFilterable = false;
    return this;
  }

  public disableFilter(): SmzBaseColumnBuilder<T> {
    this._column.filter.type = SmzFilterType.NONE;
    return this;
  }

  public editable(): SmzEditableCollectionBuilder {
    const editableBuilder = new SmzEditableCollectionBuilder(this._table, this);
    return editableBuilder;
  }

  public get columns(): SmzColumnCollectionBuilder {
    return this._parent;
  }
}

export class SmzDateColumnBuilder extends SmzBaseColumnBuilder<SmzDateColumnBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CALENDAR, SmzFilterType.DATE, field, header, true, width);
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
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CURRENCY, SmzFilterType.TEXT, field, header, true, width);
  }

}

export class SmzTextColumnBuilder extends SmzBaseColumnBuilder<SmzTextColumnBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.TEXT, SmzFilterType.TEXT, field, header, true, width);
  }

  public setFilter(type: SmzFilterType): SmzTextColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzCustomColumnBuilder extends SmzBaseColumnBuilder<SmzCustomColumnBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.CUSTOM, SmzFilterType.TEXT, field, header, false, width);
  }

  public setFilter(type: SmzFilterType): SmzCustomColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

  public enableSort(): SmzCustomColumnBuilder {
    this._column.isOrderable = true;
    return this;
  }

}

export class SmzIconColumnBuilder extends SmzBaseColumnBuilder<SmzIconColumnBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.ICON, SmzFilterType.NONE, field, header, false, width);
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

}

export class SmzDataTransformColumnBuilder extends SmzBaseColumnBuilder<SmzDataTransformColumnBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, callback: (data: any, row: any) => string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.DATA_TRANSFORM, SmzFilterType.NONE, field, header, false, width);

    (this._column.content.data as SmzDataTransform).callback = callback;
  }

  public setFilter(type: SmzFilterType): SmzDataTransformColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

}

export class SmzColumnCollectionBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {

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

  public dataTransform(field: string, header: string, callback: (data: any, row: any) => string, width: string = 'auto'): SmzDataTransformColumnBuilder {
    return new SmzDataTransformColumnBuilder(this._tableBuilder, this, field, header, callback, width);
  }

  public get table(): SmzTableBuilder {
    return this._tableBuilder;
  }
}
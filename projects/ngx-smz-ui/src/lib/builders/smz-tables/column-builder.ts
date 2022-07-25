import { SmzContentType, SmzDataTransform, SmzExportableContentSource, SmzExportableContentType, SmzIconContent } from '../../modules/smz-tables/models/content-types';
import { SmzEditableType } from '../../modules/smz-tables/models/editable-types';
import { SmzFilterType } from '../../modules/smz-tables/models/filter-types';
import { SmzTableColumn } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzEditableCollectionBuilder } from './editable-builder';
import { SmzTableBuilder } from './state-builder';


export abstract class SmzBaseColumnBuilder<T extends SmzBaseColumnBuilder<T>> {

  public _column: SmzTableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, type: SmzContentType, filterType: SmzFilterType, field: string, header: string, isOrderable: boolean, width: string = 'auto') {

    if (this._table._state.viewport.scrollable && !this._table._state.styles.columnsWidth.estimate && (width === 'auto' || width === 'fit')) {
      throw Error('You need to set a width in pixels for all columns while using \'useScrolling\' method. Or enable the \'useEstimatedColWidth\' method.');
    }

    if (this._table._state.viewport.scrollable && this._table._state.styles.columnsWidth.estimate && width === 'fit') {
      throw Error('You can\'t set width FIT while using \'useEstimatedColWidth\' method. You have to set AUTO or specify a measure value (px, em, rem...).');
    }

    const columnIndex = _table._state.columns.findIndex(c => c.field === field);

    const isExportable = type !== SmzContentType.CUSTOM && type !== SmzContentType.ICON;

    if (columnIndex !== -1) {
        // JÁ EXISTE UMA COLUNA
        this._column = this._table._state.columns[columnIndex];
        this._column.width = width;
        this._column.header = header;
        this._column.content.type = type;
    }
    else {
        // NÃO EXISTE A COLUNA AINDA

        this._column = {
          field: field,
          property: field.split('.')[0],
          header: header,
          headerStyleClass: '',
          content: {
            type: type,
            styleClass: '',
            data: { matches: [] },
            ngStyle: {},
            exportSource: SmzExportableContentSource.DATA
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
          isExportable,
          filter: {
            isGlobalFilterable: true,
            type: filterType
          },
          isVisible: true,
          isFrozen: false,
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

  public frozen(): SmzBaseColumnBuilder<T> {
    this._column.isFrozen = true;
    this._table._state.frozen.isEnabled = true;
    return this;
  }

  public addStyles(styleClass: string): SmzBaseColumnBuilder<T> {
    this._column.content.styleClass = styleClass;
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

  public ignoreOnExport(): SmzBaseColumnBuilder<T> {
    this._column.isExportable = false;
    return this;
  }

  public exportAs(type: SmzExportableContentType): SmzBaseColumnBuilder<T> {
    this._column.content.exportAs = type;
    return this;
  }

  public editable(): SmzEditableCollectionBuilder {
    const editableBuilder = new SmzEditableCollectionBuilder(this._table, this);
    return editableBuilder;
  }

  public get columns(): SmzColumnCollectionBuilder {

    const columnsWithSameNameCount = this._table._state.columns.filter(x => x.header == this._column.header).length;

    if (columnsWithSameNameCount > 1) {
      throw Error(`You can´t set more than one column with the same name. ${this._column.header}`);
    }

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
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzColumnCollectionBuilder, field: string, header: string, callback: (data: any, row: any, index: number) => string, width: string = 'auto') {
    super(_table, _parent, SmzContentType.DATA_TRANSFORM, SmzFilterType.NONE, field, header, false, width);

    (this._column.content.data as SmzDataTransform).callback = callback;
  }

  public setFilter(type: SmzFilterType): SmzDataTransformColumnBuilder {
    this._column.filter.type = type;
    return this;
  }

  public useDataAsExportSource(): SmzDataTransformColumnBuilder {
    this._column.content.exportSource = SmzExportableContentSource.DATA;
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
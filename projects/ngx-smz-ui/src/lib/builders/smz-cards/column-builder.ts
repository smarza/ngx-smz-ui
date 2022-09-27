import { uuidv4 } from '../../common/utils/utils';
import { SmzCardsBaseContent, SmzCardsCalendarContent, SmzCardsContentType, SmzCardsContentTypes, SmzCardsCustomContent, SmzCardsDataTransformContent, SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsColumn } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzCardsBuilder } from './state-builder';



export abstract class SmzCardsBaseColumnBuilder<T extends SmzCardsBaseColumnBuilder<T>> {

  public _column: SmzCardsColumn = null;

  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, type: SmzCardsContentType, key: string) {

    const columnIndex = _table._state.columns.findIndex(c => c.key === key);

    if (columnIndex !== -1) {

        // JÁ EXISTE UMA COLUNA
        this._column = this._table._state.columns[columnIndex];
    }
    else {

      const content: SmzCardsBaseContent = { type, dataPath: '' };

        // NÃO EXISTE A COLUNA AINDA
        this._column = { key, isVisible: true, styleClass: '', content: content as SmzCardsContentTypes };
        this._table._state.columns.push(this._column);

    }

  }

  // public useSort(order: 'asc' | 'desc'): SmzCardsBaseColumnBuilder<T> {
  //   this._header.sort = { isActive: true, order: order === 'asc' ? 1 : -1 };
  //   return this;
  // }

  public hide(): SmzCardsBaseColumnBuilder<T> {
    this._column.isVisible = false;
    return this;
  }

  public setCellStyles(styleClass: string): SmzCardsBaseColumnBuilder<T> {
    this._column.styleClass = styleClass;
    return this;
  }

  public get columns(): SmzCardsColumnCollectionBuilder {
    return this._parent;
  }
}

export class SmzCardsColumnCollectionBuilder extends SmzBuilderUtilities<SmzCardsColumnCollectionBuilder> {
  protected that = this;
  constructor(private _tableBuilder: SmzCardsBuilder<unknown>) {
    super();
  }

  public text(dataPath: string, key: string = uuidv4()): SmzCardsTextColumnBuilder {
    return new SmzCardsTextColumnBuilder(this._tableBuilder, this, dataPath, key);
  }

  public custom(dataPath: string, key: string): SmzCardsCustomColumnBuilder {
    return new SmzCardsCustomColumnBuilder(this._tableBuilder, this, dataPath, key);
  }

  public date(dataPath: string, key: string = uuidv4()): SmzCardsDateColumnBuilder {
    return new SmzCardsDateColumnBuilder(this._tableBuilder, this, dataPath, key);
  }

  public dataTransform(dataPath: string, key: string = uuidv4()): SmzCardsDataTransformColumnBuilder {
    return new SmzCardsDataTransformColumnBuilder(this._tableBuilder, this, dataPath, key);
  }

  public image(dataPath: string, key: string = uuidv4()): SmzCardsImageColumnBuilder {
    return new SmzCardsImageColumnBuilder(this._tableBuilder, this, dataPath, key);
  }

  public get table(): SmzCardsBuilder<unknown> {
    return this._tableBuilder;
  }
}

export class SmzCardsTextColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsTextColumnBuilder> {
  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzCardsContentType.TEXT, key);

    (this._column.content as SmzCardsTextContent).dataPath = dataPath;
  }

}

export class SmzCardsDateColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsDateColumnBuilder> {
  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzCardsContentType.CALENDAR, key);

    (this._column.content as SmzCardsCalendarContent).dataPath = dataPath;
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzCardsDateColumnBuilder {
    (this._column.content as SmzCardsCalendarContent).format = format;
    return this;
  }

}

export class SmzCardsCustomColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsCustomColumnBuilder> {
  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzCardsContentType.CUSTOM, key);

    (this._column.content as SmzCardsCustomContent).dataPath = dataPath;
    (this._column.content as SmzCardsCustomContent).searchPath = dataPath;
  }

  public setSearchDataPath(dataPath: string): SmzCardsCustomColumnBuilder {
    (this._column.content as SmzCardsCustomContent).searchPath = dataPath;
    return this;
  }

}

export class SmzCardsDataTransformColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsDataTransformColumnBuilder> {
  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzCardsContentType.DATA_TRANSFORM, key);

    (this._column.content as SmzCardsDataTransformContent).dataPath = dataPath;
    // this._header.searchPath = dataPath;
    (this._column.content as SmzCardsDataTransformContent).callback = () => '';
  }

  public setCallback(callback: (data: any, row: any, index: number) => string, key: string = uuidv4()): SmzCardsDataTransformColumnBuilder {
    (this._column.content as SmzCardsDataTransformContent).callback = callback;
    return this;
  }

  // public setSearchAndSortDataPath(dataPath: string): SmzCardsDataTransformColumnBuilder {
  //   this._header.searchPath = dataPath;
  //   this._header.sortPath = dataPath;
  //   return this;
  // }

}

export class SmzCardsImageColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsImageColumnBuilder> {
  constructor(protected _table: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzCardsContentType.IMAGE, key);

    this._column.content = {
      ...this._column.content,
      dataPath,
      useServerPath: false,
      title: {
        isVisible: false,
        getText: null
      }
    } as SmzCardsImageContent;
  }

  public useServerPath(): SmzCardsImageColumnBuilder {
    (this._column.content as SmzCardsImageContent).useServerPath = true;
    return this;
  }

  public setTitle(title: string): SmzCardsImageColumnBuilder {

    const entity = (this._column.content as SmzCardsImageContent);

    entity.title.isVisible = true;
    entity.title.getText = () => title;

    return this;
  }

  public setDynamicTitle(callback: (item: unknown) => string): SmzCardsImageColumnBuilder {

    const entity = (this._column.content as SmzCardsImageContent);

    entity.title.isVisible = true;
    entity.title.getText = callback;

    return this;
  }

}
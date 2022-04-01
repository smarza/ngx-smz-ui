import { uuidv4 } from '../../common/utils/utils';
import { SmzEasyTableBaseContent, SmzEasyTableCalendarContent, SmzEasyTableContentType, SmzEasyTableContentTypes, SmzEasyTableCustomContent, SmzEasyTableDataTransformContent, SmzEasyTableTextContent } from '../../standalones/easy-table/models/smz-easy-table-contents';
import { SmzEasyTableBodyColumn, SmzEasyTableHeader } from '../../standalones/easy-table/models/smz-easy-table-state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDocumentWidthTypes } from '../smz-documents/document-base-cell';
import { SmzEasyTableBuilder } from './state-builder';


export abstract class SmzEasyBaseColumnBuilder<T extends SmzEasyBaseColumnBuilder<T>> {

  public _column: SmzEasyTableBodyColumn = null;
  public _header: SmzEasyTableHeader = null;

  constructor(protected _table: SmzEasyTableBuilder, protected _parent: SmzEasyColumnCollectionBuilder, type: SmzEasyTableContentType, key: string, header: string) {

    const headerIndex = _table._state.desktop.head.headers.findIndex(c => c.key === key);
    const columnIndex = _table._state.desktop.body.columns.findIndex(c => c.key === key);

    if (headerIndex !== -1) {

        // JÁ EXISTE UMA COLUNA
        this._column = this._table._state.desktop.body.columns[columnIndex];
        this._header = this._table._state.desktop.head.headers[headerIndex];
    }
    else {

      const content: SmzEasyTableBaseContent = { type, dataPath: '' };

        // NÃO EXISTE A COLUNA AINDA
        this._column = { key, isVisible: true, styleClass: '', content: content as SmzEasyTableContentTypes };
        this._header = { key, isVisible: true, label: header, widthClass: '', styleClass: '', sort: null, searchPath: '', sortPath: '' };

        this._table._state.desktop.body.columns.push(this._column);
        this._table._state.desktop.head.headers.push(this._header);

    }

  }

  public useSort(order: 'asc' | 'desc'): SmzEasyBaseColumnBuilder<T> {
    this._header.sort = { isActive: true, order: order === 'asc' ? 1 : -1 };
    return this;
  }

  public hide(): SmzEasyBaseColumnBuilder<T> {
    this._column.isVisible = false;
    this._header.isVisible = false;
    return this;
  }

  public setCellStyles(styleClass: string): SmzEasyBaseColumnBuilder<T> {
    this._column.styleClass = styleClass;
    return this;
  }

  public setHeaderStyles(styleClass: string): SmzEasyBaseColumnBuilder<T> {
    this._header.styleClass = styleClass;
    return this;
  }

  public setWidth(widthClass: SmzDocumentWidthTypes): SmzEasyBaseColumnBuilder<T> {
    this._header.widthClass = widthClass;
    return this;
  }

  public get columns(): SmzEasyColumnCollectionBuilder {
    return this._parent;
  }
}

export class SmzEasyColumnCollectionBuilder extends SmzBuilderUtilities<SmzEasyColumnCollectionBuilder> {
  protected that = this;
  constructor(private _tableBuilder: SmzEasyTableBuilder) {
    super();
  }

  public text(header: string, dataPath: string, key: string = uuidv4()): SmzEasyTextColumnBuilder {
    return new SmzEasyTextColumnBuilder(this._tableBuilder, this, header, dataPath, key);
  }

  public custom(header: string, dataPath: string, key: string): SmzEasyCustomColumnBuilder {
    return new SmzEasyCustomColumnBuilder(this._tableBuilder, this, header, dataPath, key);
  }

  public date(header: string, dataPath: string, key: string = uuidv4()): SmzEasyDateColumnBuilder {
    return new SmzEasyDateColumnBuilder(this._tableBuilder, this, header, dataPath, key);
  }

  public dataTransform(header: string, dataPath: string, key: string = uuidv4()): SmzEasyDataTransformColumnBuilder {
    return new SmzEasyDataTransformColumnBuilder(this._tableBuilder, this, header, dataPath, key);
  }

  public get table(): SmzEasyTableBuilder {
    return this._tableBuilder;
  }
}

export class SmzEasyTextColumnBuilder extends SmzEasyBaseColumnBuilder<SmzEasyTextColumnBuilder> {
  constructor(protected _table: SmzEasyTableBuilder, protected _parent: SmzEasyColumnCollectionBuilder, header: string, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzEasyTableContentType.TEXT, key, header);

    (this._column.content as SmzEasyTableTextContent).dataPath = dataPath;
  }

}

export class SmzEasyDateColumnBuilder extends SmzEasyBaseColumnBuilder<SmzEasyDateColumnBuilder> {
  constructor(protected _table: SmzEasyTableBuilder, protected _parent: SmzEasyColumnCollectionBuilder, header: string, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzEasyTableContentType.CALENDAR, key, header);

    (this._column.content as SmzEasyTableCalendarContent).dataPath = dataPath;
  }

  public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzEasyDateColumnBuilder {
    (this._column.content as SmzEasyTableCalendarContent).format = format;
    return this;
  }

}

export class SmzEasyCustomColumnBuilder extends SmzEasyBaseColumnBuilder<SmzEasyCustomColumnBuilder> {
  constructor(protected _table: SmzEasyTableBuilder, protected _parent: SmzEasyColumnCollectionBuilder, header: string, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzEasyTableContentType.CUSTOM, key, header);

    (this._column.content as SmzEasyTableCustomContent).dataPath = dataPath;
    (this._column.content as SmzEasyTableCustomContent).searchPath = dataPath;
  }

  public setSearchDataPath(dataPath: string): SmzEasyCustomColumnBuilder {
    (this._column.content as SmzEasyTableCustomContent).searchPath = dataPath;
    return this;
  }

}

export class SmzEasyDataTransformColumnBuilder extends SmzEasyBaseColumnBuilder<SmzEasyDataTransformColumnBuilder> {
  constructor(protected _table: SmzEasyTableBuilder, protected _parent: SmzEasyColumnCollectionBuilder, header: string, dataPath: string, key: string = uuidv4()) {
    super(_table, _parent, SmzEasyTableContentType.DATA_TRANSFORM, key, header);

    (this._column.content as SmzEasyTableDataTransformContent).dataPath = dataPath;
    this._header.searchPath = dataPath;
    (this._column.content as SmzEasyTableDataTransformContent).callback = () => '';
  }

  public setCallback(callback: (data: any, row: any, index: number) => string, key: string = uuidv4()): SmzEasyDataTransformColumnBuilder {
    (this._column.content as SmzEasyTableDataTransformContent).callback = callback;
    return this;
  }

  public setSearchAndSortDataPath(dataPath: string): SmzEasyDataTransformColumnBuilder {
    this._header.searchPath = dataPath;
    this._header.sortPath = dataPath;
    return this;
  }

}
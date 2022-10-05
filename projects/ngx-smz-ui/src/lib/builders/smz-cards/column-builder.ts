import { uuidv4 } from '../../common/utils/utils';
import { SmzCardsBaseContent, SmzCardsContentType, SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsBuilder } from './state-builder';

export abstract class SmzCardsBaseColumnBuilder<T extends SmzCardsBaseColumnBuilder<T, TViewData>, TViewData> {

  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: TViewData, protected _content: SmzCardsBaseContent, key: string) {
  }

  public hide(): SmzCardsBaseColumnBuilder<T, TViewData> {
    this._content.isVisible = false;
    return this;
  }

  public enableGlobalFilter(): SmzCardsBaseColumnBuilder<T, TViewData> {
    const isFilterEmpty = this._builder._state.view.filterBy === '' ? true : false;
    this._builder._state.view.filterBy = `${this._builder._state.view.filterBy}${isFilterEmpty ? '' : ','}${this._content.dataPath}`;

    return this;
  }

  public setStyles(styleClass: string): SmzCardsBaseColumnBuilder<T, TViewData> {
    this._content.styleClass = styleClass;
    return this;
  }

  public get template(): TViewData {
    return this._parent;
  }
}

export class SmzCardsTextColumnBuilder<TViewData> extends SmzCardsBaseColumnBuilder<SmzCardsTextColumnBuilder<TViewData>, TViewData> {

  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: TViewData, protected _content: SmzCardsTextContent, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

    this._content.type = SmzCardsContentType.TEXT;
    this._content.dataPath = dataPath;
    this._content.maxLength = null;
    this._content.shortenSuffix = '...';
  }

  public shorten(length: number, suffix = '...'): SmzCardsTextColumnBuilder<TViewData> {
    this._content.maxLength = length;
    this._content.shortenSuffix = suffix;
    return this;
  }

  public transform(callback: (data: any, row: any) => string, key: string = uuidv4()): SmzCardsTextColumnBuilder<TViewData> {
    this._content.callback = callback;
    return this;
  }

}

// export class SmzCardsDateColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsDateColumnBuilder> {
//   constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
//     super(_builder, _parent, SmzCardsContentType.CALENDAR, key);

//     (this._column.content as SmzCardsCalendarContent).dataPath = dataPath;
//   }

//   public setDateFormat(format: 'shortDate' | 'short' | 'medium' | 'long' | 'mediumDate' | 'longDate' | 'shortTime'): SmzCardsDateColumnBuilder {
//     (this._column.content as SmzCardsCalendarContent).format = format;
//     return this;
//   }

// }

// export class SmzCardsCustomColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsCustomColumnBuilder> {
//   constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
//     super(_builder, _parent, SmzCardsContentType.CUSTOM, key);

//     (this._column.content as SmzCardsCustomContent).dataPath = dataPath;
//     (this._column.content as SmzCardsCustomContent).searchPath = dataPath;
//   }

//   public setSearchDataPath(dataPath: string): SmzCardsCustomColumnBuilder {
//     (this._column.content as SmzCardsCustomContent).searchPath = dataPath;
//     return this;
//   }

// }

// export class SmzCardsDataTransformColumnBuilder extends SmzCardsBaseColumnBuilder<SmzCardsDataTransformColumnBuilder> {
//   constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsColumnCollectionBuilder, dataPath: string, key: string = uuidv4()) {
//     super(_builder, _parent, SmzCardsContentType.DATA_TRANSFORM, key);

//     (this._column.content as SmzCardsDataTransformContent).dataPath = dataPath;
//     // this._header.searchPath = dataPath;
//     (this._column.content as SmzCardsDataTransformContent).callback = () => '';
//   }

//   public setCallback(callback: (data: any, row: any, index: number) => string, key: string = uuidv4()): SmzCardsDataTransformColumnBuilder {
//     (this._column.content as SmzCardsDataTransformContent).callback = callback;
//     return this;
//   }

//   // public setSearchAndSortDataPath(dataPath: string): SmzCardsDataTransformColumnBuilder {
//   //   this._header.searchPath = dataPath;
//   //   this._header.sortPath = dataPath;
//   //   return this;
//   // }

// }

export class SmzCardsImageColumnBuilder<TViewData> extends SmzCardsBaseColumnBuilder<SmzCardsImageColumnBuilder<TViewData>, TViewData> {
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: TViewData, protected _content: SmzCardsImageContent, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

      this._content.type = SmzCardsContentType.IMAGE;
      this._content.dataPath = dataPath;
      this._content.useServerPath = false;
      this._content.title = {
        isVisible: false,
        getText: null
      };
  }

  public useServerPath(): SmzCardsImageColumnBuilder<TViewData> {
    this._content.useServerPath = true;
    return this;
  }

  public setTitle(title: string): SmzCardsImageColumnBuilder<TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = () => title;
    return this;
  }

  public setDynamicTitle(callback: (item: any) => string): SmzCardsImageColumnBuilder<TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = callback;
    return this;
  }

}
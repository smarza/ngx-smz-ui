import { uuidv4 } from '../../common/utils/utils';
import { SmzCardsBaseContent, SmzCardsContentType, SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsBuilder } from './state-builder';

export abstract class SmzCardsBaseBuilder<T extends SmzCardsBaseBuilder<T, TViewData>, TViewData> {
  protected that: T;
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: TViewData, protected _content: SmzCardsBaseContent, key: string) {
  }

  public hideInList(): T {
    this._content.hideInList = true;
    return this.that;
  }

  public hideInGrid(): T{
    this._content.hideInGrid = true;
    return this.that;
  }

  public enableGlobalFilter(): T {
    const isFilterEmpty = this._builder._state.view.filterBy === '' ? true : false;
    this._builder._state.view.filterBy = `${this._builder._state.view.filterBy}${isFilterEmpty ? '' : ','}${this._content.dataPath}`;

    return this.that;
  }

  public setStyles(styleClass: string): T {
    this._content.styleClass = styleClass;
    return this.that;
  }

  public get template(): TViewData {
    return this._parent;
  }
}

export class SmzCardsTextBuilder<TViewData> extends SmzCardsBaseBuilder<SmzCardsTextBuilder<TViewData>, TViewData> {
  protected that = this;
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: TViewData, protected _content: SmzCardsTextContent, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

    this._content.type = SmzCardsContentType.TEXT;
    this._content.dataPath = dataPath;
    this._content.maxLength = null;
    this._content.shortenSuffix = '...';
  }

  public shorten(length: number, suffix = '...'): SmzCardsTextBuilder<TViewData> {
    this._content.maxLength = length;
    this._content.shortenSuffix = suffix;
    return this;
  }

  public transform(callback: (data: any, row: any) => string, key: string = uuidv4()): SmzCardsTextBuilder<TViewData> {
    this._content.callback = callback;
    return this;
  }

}

export class SmzCardsImageBuilder<TViewData> extends SmzCardsBaseBuilder<SmzCardsImageBuilder<TViewData>, TViewData> {
  protected that = this;
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

  public useServerPath(): SmzCardsImageBuilder<TViewData> {
    this._content.useServerPath = true;
    return this;
  }

  public setTitle(title: string): SmzCardsImageBuilder<TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = () => title;
    return this;
  }

  public setDynamicTitle(callback: (item: any) => string): SmzCardsImageBuilder<TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = callback;
    return this;
  }

}
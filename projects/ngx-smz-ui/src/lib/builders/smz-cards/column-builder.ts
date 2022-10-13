import { uuidv4 } from '../../common/utils/utils';
import { SmzCardsBaseContent, SmzCardsContentType, SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsIconContent } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsBuilder } from './state-builder';

export abstract class SmzCardsBaseBuilder<TBuilder, T extends SmzCardsBaseBuilder<TBuilder, T, TViewData>, TViewData> {
  protected that: T;
  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsBaseContent, key: string) {
  }

  public hideInList(): T {
    this._content.hideInList = true;
    return this.that;
  }

  public hideInGrid(): T{
    this._content.hideInGrid = true;
    return this.that;
  }

  // public enableGlobalFilter(): T {
  //   const isFilterEmpty = this._builder._state.view.filterBy === '' ? true : false;
  //   this._builder._state.view.filterBy = `${this._builder._state.view.filterBy}${isFilterEmpty ? '' : ','}${this._content.dataPath}`;

  //   return this.that;
  // }

  public setStyles(styleClass: string): T {
    this._content.styleClass = styleClass;
    return this.that;
  }

  public get template(): TViewData {
    return this._parent;
  }
}

export class SmzCardsTextBuilder<TBuilder, TViewData> extends SmzCardsBaseBuilder<TBuilder, SmzCardsTextBuilder<TBuilder, TViewData>, TViewData> {
  protected that = this;
  private _iconConfigurations: SmzCardsIconContent[] = [];

  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsTextContent, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

    this._content.type = SmzCardsContentType.TEXT;
    this._content.dataPath = dataPath;
    this._content.maxLength = null;
    this._content.shortenSuffix = '...';
  }

  public shorten(length: number, suffix = '...'): SmzCardsTextBuilder<TBuilder, TViewData> {
    this._content.maxLength = length;
    this._content.shortenSuffix = suffix;
    return this;
  }

  public transform(callback: (data: any, row: any) => string, key: string = uuidv4()): SmzCardsTextBuilder<TBuilder, TViewData> {
    if (this._iconConfigurations.length > 0) {
      throw Error(`You can't call transform while using addIconConfiguration.`);
    }

    this._content.callback = callback;
    return this;
  }

  public addIconConfiguration(icon: string, value: any, styleClass: string = '', appendText: string = null): SmzCardsTextBuilder<TBuilder, TViewData> {
    if (this._content.callback != null) {
      throw Error(`You can't call addIconConfiguration while using transform.`);
    }
    this._iconConfigurations.push({ icon, value, styleClass: styleClass, appendText });
    return this;
  }

  public get template(): TViewData {

    if (this._iconConfigurations.length > 0) {
      this._content.callback = (value: any): string => {
        const icon = this._iconConfigurations.find(x => x.value === value);

        if (icon == null) {
          return null;
        }
        else if (icon.appendText == null) {
          return `<i class="${icon.icon} ${icon.styleClass}"></i>`;
        }
        else {
          const iconHtml = `<i class="${icon.icon}"></i>`;
          const begin = icon.appendText == null ? '' : `<div class="grid grid-nogutter items-center justify-start gap-1 ${icon.styleClass}">`;
          const end = icon.appendText == null ? '' : `<div>${icon.appendText}</div></div>`;
          return `${begin}${iconHtml}${end}`;
        }
      }
    }

    return this._parent;
  }

}

export class SmzCardsImageBuilder<TBuilder, TViewData> extends SmzCardsBaseBuilder<TBuilder, SmzCardsImageBuilder<TBuilder, TViewData>, TViewData> {
  protected that = this;
  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsImageContent, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

      this._content.type = SmzCardsContentType.IMAGE;
      this._content.dataPath = dataPath;
      this._content.useServerPath = false;
      this._content.title = {
        isVisible: false,
        getText: null
      };
  }

  public useServerPath(): SmzCardsImageBuilder<TBuilder, TViewData> {
    this._content.useServerPath = true;
    return this;
  }

  public setTitle(title: string): SmzCardsImageBuilder<TBuilder, TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = () => title;
    return this;
  }

  public setDynamicTitle(callback: (item: any) => string): SmzCardsImageBuilder<TBuilder, TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = callback;
    return this;
  }

}
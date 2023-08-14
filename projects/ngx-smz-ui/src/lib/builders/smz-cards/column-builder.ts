import { uuidv4 } from '../../common/utils/utils';
import { SmzCardsBaseContent, SmzCardsComponentContent, SmzCardsContentType, SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsIconContent } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsBuilder } from './state-builder';
import { SmzCardsBaseTemplateBuilder } from './types/base-card-type.builder';

export abstract class SmzCardsBaseBuilder<TData, TBuilder, T extends SmzCardsBaseBuilder<TData, TBuilder, T, TViewData>, TViewData> {
  protected that: T;
  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsBaseContent<TData>, key: string) {
  }

  public hideInList(): T {
    this._content.hideInList = true;
    return this.that;
  }

  public hideInGrid(): T{
    this._content.hideInGrid = true;
    return this.that;
  }

  public setStyles(styleClass: string): T {
    this._content.styleClass = styleClass;
    return this.that;
  }

  public setStylesConditionally(callback: (data: TData) => string): T {
    this._content.conditionalStyleClass = callback;
    return this.that;
  }

  public get template(): TViewData {
    return this._parent;
  }
}

export class SmzCardsTextBuilder<TData, TBuilder, TViewData> extends SmzCardsBaseBuilder<TData, TBuilder, SmzCardsTextBuilder<TData, TBuilder, TViewData>, TViewData> {
  protected that = this;
  private _iconConfigurations: SmzCardsIconContent[] = [];

  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsTextContent<TData>, dataPath: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

    this._content.type = SmzCardsContentType.TEXT;
    this._content.dataPath = dataPath;
    this._content.maxLength = null;
    this._content.shortenSuffix = '...';
    this._content.conditionalStyleClass = null;
  }

  public shorten(length: number, suffix = '...'): SmzCardsTextBuilder<TData, TBuilder, TViewData> {
    this._content.maxLength = length;
    this._content.shortenSuffix = suffix;
    return this;
  }

  public transform(callback: (data: any, row: any) => string, key: string = uuidv4()): SmzCardsTextBuilder<TData, TBuilder, TViewData> {
    if (this._iconConfigurations.length > 0) {
      throw Error(`You can't call transform while using addIconConfiguration.`);
    }

    this._content.callback = callback;
    return this;
  }

  public enableGlobalFilter(): SmzCardsTextBuilder<TData, TBuilder, TViewData> {
    (this._builder as SmzCardsBuilder<any>)._state.template.globalFilterProperties.push(this._content.dataPath);
    return this.that;
  }

  public addIconConfiguration(icon: string, value: any, styleClass: string = '', appendText: string = null): SmzCardsTextBuilder<TData, TBuilder, TViewData> {
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

export class SmzCardsComponentBuilder<TData, TBuilder, TViewData> extends SmzCardsBaseBuilder<TData, TBuilder, SmzCardsComponentBuilder<TData, TBuilder, TViewData>, TViewData> {
  protected that = this;

  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsComponentContent<TData>, component: any, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

    this._content.type = SmzCardsContentType.COMPONENT;
    this._content.componentData = { component: component, inputs: [], outputs: [] };
  }

  public addInputWithContext(input: string): SmzCardsComponentBuilder<TData, TBuilder, TViewData> {
    this._content.componentData.inputs.push({ input, value: null, useAllContext: true, dataPath: null });
    return this;
  }

  public addInputFromModel(input: string, dataPath: any): SmzCardsComponentBuilder<TData, TBuilder, TViewData> {
    this._content.componentData.inputs.push({ input, dataPath, value: null, useAllContext: false });
    return this;
  }

  public addInput(input: string, value: any): SmzCardsComponentBuilder<TData, TBuilder, TViewData> {
    this._content.componentData.inputs.push({ input, value, dataPath: null, useAllContext: false });
    return this;
  }

  public addOutput(output: string, callback: (data: any) => void): SmzCardsComponentBuilder<TData, TBuilder, TViewData> {
    this._content.componentData.outputs.push({output, callback});
    return this;
  }

  public get template(): TViewData {
    return this._parent;
  }

}

export class SmzCardsImageBuilder<TData, TBuilder, TViewData> extends SmzCardsBaseBuilder<TData, TBuilder, SmzCardsImageBuilder<TData, TBuilder, TViewData>, TViewData> {
  protected that = this;
  constructor(protected _builder: TBuilder, protected _parent: TViewData, protected _content: SmzCardsImageContent<TData>, dataPath: string, private baseImageStyles: string, key: string = uuidv4()) {
    super(_builder, _parent, _content, key);

      this._content.type = SmzCardsContentType.IMAGE;
      this._content.dataPath = dataPath;
      this._content.useServerPath = false;
      this._content.title = {
        isVisible: false,
        getText: null
      };
      this._content.maximize = true;
      this._content.openMaximized = false;
      this._content.transform = {
        callback: null,
        override: null
      };

      this._content.listStyleClass = this.baseImageStyles;
      this._content.gridStyleClass = this.baseImageStyles;
  }

  public useServerPath(): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.useServerPath = true;
    return this;
  }

  public disableMaximize(): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.maximize = false;
    return this;
  }

  public openMaximized(): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.openMaximized = true;
    return this;
  }

  public setTitle(title: string): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = () => title;
    return this;
  }

  public setDynamicTitle(callback: (item: any) => string): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.title.isVisible = true;
    this._content.title.getText = callback;
    return this;
  }

  public transform(callback: (item: any, content: SmzCardsImageContent<TData>) => SmzCardsImageContent<TData>): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.transform.callback = callback;
    return this;
  }

  public overrideGridStyles(styleClass: string): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.gridStyleClass = ` ${styleClass}`;
    return this;
  }

  public overrideListStyles(styleClass: string): SmzCardsImageBuilder<TData, TBuilder, TViewData> {
    this._content.listStyleClass = ` ${styleClass}`;
    return this;
  }

  public get template(): TViewData {
    return this._parent;
  }

}
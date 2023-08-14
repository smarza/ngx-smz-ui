import { cloneDeep } from 'lodash-es';
import { SmzFlipCardChanges, SmzFlipCardContext, SmzFlipCardStatus } from '../../../modules/smz-cards/models/contexts/smz-flip-card-context';
import { SmzCardsComponentContent, SmzCardsImageContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { FlipCardTemplate, SmzCardsTemplate, SmzFlipCardSide } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzBuilderUtilities } from '../../common/smz-builder-utilities';
import { SmzCardsComponentBuilder, SmzCardsImageBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';

export class SmzCardsFlipCardBuilder<TData, TBuilder> extends SmzBuilderUtilities<SmzCardsFlipCardBuilder<TData, TBuilder>> {
  protected that = this;

  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TData, TBuilder>, protected _template: FlipCardTemplate<TData>) {
    super();

    _template.type = SmzCardsTemplate.FLIP_CARD;
    this._template.width = '200px';
    this._template.height = '200px';
    this._template.menuLocation = 'back';
    this._template.buttonsLocation = 'back';
    this._template._context = new SmzFlipCardContext();
    this._template.onChange = (changes: SmzFlipCardChanges) => {}
  }

  public onChange(callback: (changes: SmzFlipCardChanges) => void): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.onChange = callback;
    return this;
  }

  public applyData(initialData: { key: any, status: SmzFlipCardStatus }[]): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template._context.initialData = cloneDeep(initialData);
    return this;
  }

  public setKey(propertyPath: string): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template._context.propertyPath = propertyPath;
    return this;
  }

  public useDataModelStatus(propertyPath: string): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template._context.statusDataProperty = propertyPath;
    return this;
  }

  public useDynamicData(callback: (data: any[]) => { key: any, status: SmzFlipCardStatus }[]): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template._context.dynamicInitialData = callback;
    return this;
  }

  public setFlipCounts(count: number): SmzCardsFlipCardBuilder<TData, TBuilder> {

    if (this._template._context.flipBehavior === 'toggle') {
      throw Error(`You can't call setFlipCounts() while flipBehavior is set to toggle`);
    }

    this._template._context.setCounts(count);
    return this;
  }

  public setToggleBehavior(count: number): SmzCardsFlipCardBuilder<TData, TBuilder> {

    if (count <= 0) {
      throw Error(`You can't call setToggleBehavior() with count lower than 1`);
    }

    this._template._context.flipBehavior = 'toggle';
    this._template._context.setCounts(count);

    return this;
  }

  public enableAtLeastOneSelectedBehavior(): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template._context.unselectBehavior = 'at-least-one-flipped';
    return this;
  }

  public setCardSize(width: string, height: string): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.width = width;
    this._template.height = height;
    return this;
  }

  public setMenuLocation(card: 'front' | 'back'): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.menuLocation = card;
    return this;
  }

  public setButtonsLocation(card: 'front' | 'back'): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.buttonsLocation = card;
    return this;
  }

  public setCardStyles(cardStyleClass: string): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setContentStyles(contentStyleClass: string): SmzCardsFlipCardBuilder<TData, TBuilder> {
    this._template.contentStyleClass = contentStyleClass;
    return this;
  }

  public front(): SmzCardsFlipCardSideBuilder<TData, TBuilder> {
    this._template.front = {} as SmzFlipCardSide<TData>;
    return new SmzCardsFlipCardSideBuilder<TData, TBuilder>(this._builder, this, this._template.front);
  }

  public back(): SmzCardsFlipCardSideBuilder<TData, TBuilder> {
    this._template.back = {} as SmzFlipCardSide<TData>;
    return new SmzCardsFlipCardSideBuilder<TData, TBuilder>(this._builder, this, this._template.back);
  }

  public get template(): SmzCardsTemplateBuilder<TData, TBuilder> {
    return this._parent;
  }

}

export class SmzCardsFlipCardSideBuilder<TData, TBuilder> extends SmzBuilderUtilities<SmzCardsFlipCardSideBuilder<TData, TBuilder>> {
  protected that = this;
  constructor(private _builder: TBuilder, private _templateBuilder: SmzCardsFlipCardBuilder<TData, TBuilder>, private _side: SmzFlipCardSide<TData>) {
    super();
  }

  public image(dataPath: string): SmzCardsImageBuilder<TData, TBuilder, SmzCardsFlipCardSideBuilder<TData, TBuilder>> {
    this._side.image = {} as SmzCardsImageContent<TData>;
    const baseImageStyles: string = ' w-full h-full';
    return new SmzCardsImageBuilder<TData, TBuilder, SmzCardsFlipCardSideBuilder<TData, TBuilder>>(this._builder, this, this._side.image, dataPath, baseImageStyles, dataPath);
  }

  public component(component: any): SmzCardsComponentBuilder<TData, TBuilder, SmzCardsFlipCardSideBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsComponentContent<TData>;
    this._side.component = content;
    return new SmzCardsComponentBuilder<TData, TBuilder, SmzCardsFlipCardSideBuilder<TData, TBuilder>>(this._builder, this, content, component);
  }

  public html(html: string):SmzCardsFlipCardSideBuilder<TData, TBuilder> {
    this._side.html = html;
    return this;
  }

  public get front(): SmzCardsFlipCardBuilder<TData, TBuilder> {
    return this._templateBuilder;
  }

  public get back(): SmzCardsFlipCardBuilder<TData, TBuilder> {
    return this._templateBuilder;
  }
}
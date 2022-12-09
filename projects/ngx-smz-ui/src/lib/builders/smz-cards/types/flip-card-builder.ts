import { SmzCardsImageContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { FlipCardTemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsImageBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsFlipCardBuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>> {

  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: FlipCardTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.FLIP_CARD;
    this._template.width = '200px';
    this._template.height = '200px';
    this._template.menuLocation = 'back';
    this._template.buttonsLocation = 'back';
  }

  public setCardSize(width: string, height: string): SmzCardsFlipCardBuilder<TBuilder> {
    this._template.width = width;
    this._template.height = height;
    return this;
  }

  public setMenuLocation(card: 'front' | 'back'): SmzCardsFlipCardBuilder<TBuilder> {
    this._template.menuLocation = card;
    return this;
  }

  public setButtonsLocation(card: 'front' | 'back'): SmzCardsFlipCardBuilder<TBuilder> {
    this._template.buttonsLocation = card;
    return this;
  }

  public setCardStyles(cardStyleClass: string): SmzCardsFlipCardBuilder<TBuilder> {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setContentStyles(contentStyleClass: string): SmzCardsFlipCardBuilder<TBuilder> {
    this._template.contentStyleClass = contentStyleClass;
    return this;
  }

  public frontImage(dataPath: string): SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>> {
    this._template.frontImage = {} as SmzCardsImageContent;
    const baseImageStyles: string = '';
    return new SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>>(this._builder, this, this._template.frontImage, dataPath, baseImageStyles);
  }

  public backImage(dataPath: string): SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>> {
    this._template.backImage = {} as SmzCardsImageContent;
    const baseImageStyles: string = ' ';
    return new SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>>(this._builder, this, this._template.backImage, dataPath, baseImageStyles);
  }

}
import { SmzCardsImageContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { FlipCardTemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsImageBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsFlipCardBuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>> {
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: FlipCardTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.FLIP_CARD;
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
    return new SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>>(this._builder, this, this._template.frontImage, dataPath);
  }

  public backImage(dataPath: string): SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>> {
    this._template.backImage = {} as SmzCardsImageContent;
    return new SmzCardsImageBuilder<TBuilder, SmzCardsFlipCardBuilder<TBuilder>>(this._builder, this, this._template.backImage, dataPath);
  }

}
import { SmzCardsComponentContent, SmzCardsImageContent, SmzCardsTextContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { ImageWithDetailsTemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsComponentBuilder, SmzCardsImageBuilder, SmzCardsTextBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsImageWithDetailsBuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: ImageWithDetailsTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.IMAGE_WITH_DETAILS;
    _template.tags = [];
    _template.components = [];
    _template.others = [];
  }

  public setCardStyles(cardStyleClass: string): SmzCardsImageWithDetailsBuilder<TBuilder> {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setContentStyles(contentStyleClass: string): SmzCardsImageWithDetailsBuilder<TBuilder> {
    this._template.contentStyleClass = contentStyleClass;
    return this;
  }

  public image(dataPath: string): SmzCardsImageBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    this._template.image = {} as SmzCardsImageContent;
    return new SmzCardsImageBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, this._template.image, dataPath);
  }

  public title(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    this._template.title = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, this._template.title as SmzCardsTextContent, dataPath);
  }

  public subTitle(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    this._template.subTitle = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, this._template.subTitle as SmzCardsTextContent, dataPath);
  }

  public addTag(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    const content = {} as SmzCardsTextContent;
    this._template.tags.push(content);
    return new SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, content, dataPath);
  }

  public addComponent(component: any): SmzCardsComponentBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    const content = {} as SmzCardsComponentContent;
    this._template.components.push(content);
    return new SmzCardsComponentBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, content, component);
  }

  public addText(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    const content = {} as SmzCardsTextContent;
    this._template.others.push(content);
    return new SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, content, dataPath);
  }

}
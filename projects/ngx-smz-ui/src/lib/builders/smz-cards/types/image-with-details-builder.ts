import { SmzCardsComponentContent, SmzCardsImageContent, SmzCardsTextContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { ImageWithDetailsTemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsComponentBuilder, SmzCardsImageBuilder, SmzCardsTextBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsImageWithDetailsBuilder<TData, TBuilder> extends SmzCardsBaseTemplateBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
  constructor(protected override _builder: TBuilder, protected override _parent: SmzCardsTemplateBuilder<TData, TBuilder>, protected override _template: ImageWithDetailsTemplate<TData>) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.IMAGE_WITH_DETAILS;
    _template.tags = [];
    _template.components = [];
    _template.others = [];
  }

  public setCardStyles(cardStyleClass: string): SmzCardsImageWithDetailsBuilder<TData, TBuilder> {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setContentStyles(contentStyleClass: string): SmzCardsImageWithDetailsBuilder<TData, TBuilder> {
    this._template.contentStyleClass = contentStyleClass;
    return this;
  }

  public image(dataPath: string): SmzCardsImageBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    this._template.image = {} as SmzCardsImageContent<TData>;
    const baseImageStyles: string = ' h-60 w-full object-cover rounded-lg border-0';
    return new SmzCardsImageBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, this._template.image, dataPath, baseImageStyles, dataPath);
  }

  public title(dataPath: string): SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    this._template.title = {} as SmzCardsTextContent<TData>;
    return new SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, this._template.title as SmzCardsTextContent<TData>, dataPath);
  }

  public subTitle(dataPath: string): SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    this._template.subTitle = {} as SmzCardsTextContent<TData>;
    return new SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, this._template.subTitle as SmzCardsTextContent<TData>, dataPath);
  }

  public addTag(dataPath: string): SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsTextContent<TData>;
    this._template.tags.push(content);
    return new SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, content, dataPath);
  }

  public addComponent(component: any): SmzCardsComponentBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsComponentContent<TData>;
    this._template.components.push(content);
    return new SmzCardsComponentBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, content, component);
  }

  public addText(dataPath: string): SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsTextContent<TData>;
    this._template.others.push(content);
    return new SmzCardsTextBuilder<TData, TBuilder, SmzCardsImageWithDetailsBuilder<TData, TBuilder>>(this._builder, this, content, dataPath);
  }

}
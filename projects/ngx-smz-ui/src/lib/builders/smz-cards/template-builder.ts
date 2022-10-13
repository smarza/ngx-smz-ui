import { SmzCardView } from '../../modules/smz-cards/models/smz-cards-state';
import { ImageWithDetailsTemplate, InfoATemplate, RawTemplate, SmzCardsTemplate, SmzCardsTemplates } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzCardsBuilder } from './state-builder';
import { SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsImageBuilder, SmzCardsTextBuilder } from './column-builder';

export abstract class SmzCardsBaseTemplateBuilder<TBuilder, T extends SmzCardsBaseTemplateBuilder<TBuilder, T>> {

  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: SmzCardsTemplates) {
  }

  public get template(): SmzCardsTemplateBuilder<TBuilder> {
    return this._parent;
  }
}


export class SmzCardViewBuilder extends SmzBuilderUtilities<SmzCardViewBuilder> {
  protected that = this;
  constructor(private _cardsBuilder: SmzCardsBuilder<unknown>, private _viewData: SmzCardView, private _layout: 'grid' | 'list') {
    super();
  }

  public useAsDefault(): SmzCardViewBuilder {
    this._cardsBuilder._state.view.layout = this._layout;
    return this;
  }

  public setLayout(styleClass: string): SmzCardViewBuilder {
    this._viewData.styleClass.layout = styleClass;
    return this;
  }

  public setPadding(styleClass: string): SmzCardViewBuilder {
    this._viewData.styleClass.padding = styleClass;
    return this;
  }

  public setStyles(styleClass: string): SmzCardViewBuilder {
    this._viewData.styleClass.general = styleClass;
    return this;
  }

  public get cards(): SmzCardsBuilder<unknown> {

    let styles = this._viewData.styleClass;
    this._viewData.styleClass.all = `${styles.layout} ${styles.padding} ${styles.general}`;

    return this._cardsBuilder;
  }
}

export class SmzCardsTemplateBuilder<TBuilder> extends SmzBuilderUtilities<SmzCardsTemplateBuilder<TBuilder>> {
  protected that = this;
  private hasTemplate = false;
  constructor(private _builder: TBuilder, private _template: SmzCardsTemplates) {
    super();
  }

  public raw(): SmzCardsRawBuilder<TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsRawBuilder(this._builder, this, this._template as RawTemplate);
  }

  public imageWithDetails(): SmzCardsImageWithDetailsBuilder<TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsImageWithDetailsBuilder(this._builder, this, this._template as ImageWithDetailsTemplate);
  }

  public infoA(): SmzCardsInfoABuilder<TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsInfoABuilder(this._builder, this, this._template as InfoATemplate);
  }

  public get cards(): TBuilder {
    return this._builder;
  }
}

export class SmzCardsRawBuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsRawBuilder<TBuilder>> {
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: RawTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.RAW;
  }

  public test(): SmzCardsRawBuilder<TBuilder> {
    return this;
  }

}


export class SmzCardsImageWithDetailsBuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: ImageWithDetailsTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.IMAGE_WITH_DETAILS;
    _template.tags = [];
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

  public addText(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>> {
    const content = {} as SmzCardsTextContent;
    this._template.others.push(content);
    return new SmzCardsTextBuilder<TBuilder, SmzCardsImageWithDetailsBuilder<TBuilder>>(this._builder, this, content, dataPath);
  }

}

export class SmzCardsInfoABuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
  private _bulletStyleClass: string;
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: InfoATemplate) {
    super(_builder, _parent, _template);

    _template.type = SmzCardsTemplate.INFO_A;
    _template.tags = [];
    _template.infos = [];
  }

  public setVerticalBarStyles(verticalBarStyleClass: string): SmzCardsInfoABuilder<TBuilder> {
    this._template.verticalBarStyleClass = verticalBarStyleClass;
    return this;
  }

  public setCardStyles(cardStyleClass: string): SmzCardsInfoABuilder<TBuilder> {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setBulletsStyles(bulletStyleClass: string): SmzCardsInfoABuilder<TBuilder> {
    this._bulletStyleClass = bulletStyleClass;

    return this;
  }

  public title(dataPath: string, caption: string = ''): SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
    this._template.title = {
      caption,
      content: {} as SmzCardsTextContent
    }
    return new SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>>(this._builder, this, this._template.title.content, dataPath);
  }

  public subTitle(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
    this._template.subTitle = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>>(this._builder, this, this._template.subTitle, dataPath);
  }

  public addTag(dataPath: string): SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
    const content = {} as SmzCardsTextContent;
    this._template.tags.push(content);
    return new SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>>(this._builder, this, content, dataPath);
  }

  public addInfo(dataPath: string, caption: string = '', bulletStyleClass?: string): SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
    const info = {
      caption,
      bulletStyleClass,
      content: {} as SmzCardsTextContent
    }
    this._template.infos.push(info);
    return new SmzCardsTextBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>>(this._builder, this, info.content, dataPath);
  }

  public get template(): SmzCardsTemplateBuilder<TBuilder> {

    if (this._bulletStyleClass != null) {
      if (this._template.infos.length === 0) {
        throw Error('[Smz Cards] You can\'t call \'setBullets\' because there is no info yet.');
      }

      this._template.infos
        .filter(x => x.bulletStyleClass == null)
        .forEach(x => x.bulletStyleClass = this._bulletStyleClass);
    }

    return this._parent;
  }

}


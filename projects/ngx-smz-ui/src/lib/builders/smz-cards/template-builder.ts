import { SmzCardView } from '../../modules/smz-cards/models/smz-cards-state';
import { ImageWithDetailsTemplate, InfoATemplate, RawTemplate, SmzCardsTemplate, SmzCardsTemplates } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzCardsBuilder } from './state-builder';
import { SmzCardsImageContent, SmzCardsTextContent } from '../../modules/smz-cards/models/smz-cards-contents';
import { SmzCardsImageBuilder, SmzCardsTextBuilder } from './column-builder';

export abstract class SmzCardsBaseTemplateBuilder<T extends SmzCardsBaseTemplateBuilder<T>> {

  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsTemplateBuilder, protected _template: SmzCardsTemplates) {
  }

  public get template(): SmzCardsTemplateBuilder {
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

export class SmzCardsTemplateBuilder extends SmzBuilderUtilities<SmzCardsTemplateBuilder> {
  protected that = this;
  private hasTemplate = false;
  constructor(private _cardsBuilder: SmzCardsBuilder<unknown>, private _template: SmzCardsTemplates) {
    super();
  }

  public raw(): SmzCardsRawBuilder {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsRawBuilder(this._cardsBuilder, this, this._template as RawTemplate);
  }

  public imageWithDetails(): SmzCardsImageWithDetailsBuilder {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsImageWithDetailsBuilder(this._cardsBuilder, this, this._template as ImageWithDetailsTemplate);
  }

  public infoA(): SmzCardsInfoABuilder {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsInfoABuilder(this._cardsBuilder, this, this._template as InfoATemplate);
  }

  public get cards(): SmzCardsBuilder<unknown> {
    return this._cardsBuilder;
  }
}

export class SmzCardsRawBuilder extends SmzCardsBaseTemplateBuilder<SmzCardsRawBuilder> {
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsTemplateBuilder, protected _template: RawTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.RAW;
  }

  public test(): SmzCardsRawBuilder {
    return this;
  }

}


export class SmzCardsImageWithDetailsBuilder extends SmzCardsBaseTemplateBuilder<SmzCardsImageWithDetailsBuilder> {
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsTemplateBuilder, protected _template: ImageWithDetailsTemplate) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.IMAGE_WITH_DETAILS;
    _template.tags = [];
    _template.others = [];
  }

  public setCardStyles(cardStyleClass: string): SmzCardsImageWithDetailsBuilder {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setContentStyles(contentStyleClass: string): SmzCardsImageWithDetailsBuilder {
    this._template.contentStyleClass = contentStyleClass;
    return this;
  }

  public image(dataPath: string): SmzCardsImageBuilder<SmzCardsImageWithDetailsBuilder> {
    this._template.image = {} as SmzCardsImageContent;
    return new SmzCardsImageBuilder<SmzCardsImageWithDetailsBuilder>(this._builder, this, this._template.image, dataPath);
  }

  public title(dataPath: string): SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder> {
    this._template.title = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder>(this._builder, this, this._template.title as SmzCardsTextContent, dataPath);
  }

  public subTitle(dataPath: string): SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder> {
    this._template.subTitle = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder>(this._builder, this, this._template.subTitle as SmzCardsTextContent, dataPath);
  }

  public addTag(dataPath: string): SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder> {
    const content = {} as SmzCardsTextContent;
    this._template.tags.push(content);
    return new SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder>(this._builder, this, content, dataPath);
  }

  public addText(dataPath: string): SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder> {
    const content = {} as SmzCardsTextContent;
    this._template.others.push(content);
    return new SmzCardsTextBuilder<SmzCardsImageWithDetailsBuilder>(this._builder, this, content, dataPath);
  }

}

export class SmzCardsInfoABuilder extends SmzCardsBaseTemplateBuilder<SmzCardsInfoABuilder> {
  private _bulletStyleClass: string;
  constructor(protected _builder: SmzCardsBuilder<unknown>, protected _parent: SmzCardsTemplateBuilder, protected _template: InfoATemplate) {
    super(_builder, _parent, _template);

    _template.type = SmzCardsTemplate.INFO_A;
    _template.tags = [];
    _template.infos = [];
  }

  public setVerticalBarStyles(verticalBarStyleClass: string): SmzCardsInfoABuilder {
    this._template.verticalBarStyleClass = verticalBarStyleClass;
    return this;
  }

  public setCardStyles(cardStyleClass: string): SmzCardsInfoABuilder {
    this._template.cardStyleClass = cardStyleClass;
    return this;
  }

  public setBulletsStyles(bulletStyleClass: string): SmzCardsInfoABuilder {
    this._bulletStyleClass = bulletStyleClass;

    return this;
  }

  public title(dataPath: string, caption: string = ''): SmzCardsTextBuilder<SmzCardsInfoABuilder> {
    this._template.title = {
      caption,
      content: {} as SmzCardsTextContent
    }
    return new SmzCardsTextBuilder<SmzCardsInfoABuilder>(this._builder, this, this._template.title.content, dataPath);
  }

  public subTitle(dataPath: string): SmzCardsTextBuilder<SmzCardsInfoABuilder> {
    this._template.subTitle = {} as SmzCardsTextContent;
    return new SmzCardsTextBuilder<SmzCardsInfoABuilder>(this._builder, this, this._template.subTitle, dataPath);
  }

  public addTag(dataPath: string): SmzCardsTextBuilder<SmzCardsInfoABuilder> {
    const content = {} as SmzCardsTextContent;
    this._template.tags.push(content);
    return new SmzCardsTextBuilder<SmzCardsInfoABuilder>(this._builder, this, content, dataPath);
  }

  public addInfo(dataPath: string, caption: string = '', bulletStyleClass?: string): SmzCardsTextBuilder<SmzCardsInfoABuilder> {
    const info = {
      caption,
      bulletStyleClass,
      content: {} as SmzCardsTextContent
    }
    this._template.infos.push(info);
    return new SmzCardsTextBuilder<SmzCardsInfoABuilder>(this._builder, this, info.content, dataPath);
  }

  public get template(): SmzCardsTemplateBuilder {

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


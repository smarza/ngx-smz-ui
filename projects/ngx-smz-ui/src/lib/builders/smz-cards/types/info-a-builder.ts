import { SmzCardsTextContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { InfoATemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsTextBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsInfoABuilder<TBuilder> extends SmzCardsBaseTemplateBuilder<TBuilder, SmzCardsInfoABuilder<TBuilder>> {
  private _bulletStyleClass: string;
  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: InfoATemplate) {
    super(_builder, _parent, _template);

    _template.type = SmzCardsTemplate.INFO_A;
    _template.tags = [];
    _template.infos = [];
    _template.tagsContainerStyleClass = 'gap-2 mt-2';
    _template.infosContainerStyleClass = ' mt-2 gap-3';
  }

  public setTagsContainerStyleClass(styleClass: string): SmzCardsInfoABuilder<TBuilder> {
    this._template.tagsContainerStyleClass = styleClass;
    return this;
  }

  public setInfosContainerStyleClass(styleClass: string): SmzCardsInfoABuilder<TBuilder> {
    this._template.infosContainerStyleClass = styleClass;
    return this;
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


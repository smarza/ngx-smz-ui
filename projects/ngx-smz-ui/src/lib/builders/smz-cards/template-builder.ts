import { SmzCardView } from '../../modules/smz-cards/models/smz-cards-state';
import { FlipCardTemplate, ImageWithDetailsTemplate, InfoATemplate, RawTemplate, SmzCardsTemplate, SmzCardsTemplates } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzCardsBuilder } from './state-builder';
import { SmzCardsInfoABuilder } from './types/info-a-builder';
import { SmzCardsImageWithDetailsBuilder } from './types/image-with-details-builder';
import { SmzCardsFlipCardBuilder } from './types/flip-card-builder';
import { SmzCardsBaseTemplateBuilder } from './types/base-card-type.builder';


export class SmzCardViewBuilder<T> extends SmzBuilderUtilities<SmzCardViewBuilder<T>> {
  protected that = this;
  constructor(private _cardsBuilder: SmzCardsBuilder<T>, private _viewData: SmzCardView, private _layout: 'grid' | 'list') {
    super();
  }

  public useAsDefault(): SmzCardViewBuilder<T> {
    this._cardsBuilder._state.view.layout = this._layout;
    return this;
  }

  public setLayout(styleClass: string): SmzCardViewBuilder<T> {
    this._viewData.styleClass.layout = styleClass;
    return this;
  }

  public setPadding(styleClass: string): SmzCardViewBuilder<T> {
    this._viewData.styleClass.padding = styleClass;
    return this;
  }

  public setStyles(styleClass: string): SmzCardViewBuilder<T> {
    this._viewData.styleClass.general = styleClass;
    return this;
  }

  public get cards(): SmzCardsBuilder<T> {

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

  public flipCard(): SmzCardsFlipCardBuilder<TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsFlipCardBuilder(this._builder, this, this._template as FlipCardTemplate);
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
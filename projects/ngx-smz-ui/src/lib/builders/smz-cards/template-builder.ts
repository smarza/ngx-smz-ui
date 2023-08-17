import { SmzCardView } from '../../modules/smz-cards/models/smz-cards-state';
import { FlipCardTemplate, ImageWithDetailsTemplate, InfoATemplate, RawTemplate, SmzCardsTemplates } from '../../modules/smz-cards/models/smz-cards-templates';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzCardsBuilder } from './state-builder';
import { SmzCardsInfoABuilder } from './types/info-a-builder';
import { SmzCardsImageWithDetailsBuilder } from './types/image-with-details-builder';
import { SmzCardsFlipCardBuilder } from './types/flip-card-builder';
import { SmzCardsRawBuilder } from './types/raw-builder';


export class SmzCardViewBuilder<TData> extends SmzBuilderUtilities<SmzCardViewBuilder<TData>> {
  protected that = this;
  constructor(private _cardsBuilder: SmzCardsBuilder<TData>, private _viewData: SmzCardView, private _layout: 'grid' | 'list') {
    super();
  }

  public useAsDefault(): SmzCardViewBuilder<TData> {
    this._cardsBuilder._state.view.layout = this._layout;
    return this;
  }

  public setLayout(styleClass: string): SmzCardViewBuilder<TData> {
    this._viewData.styleClass.layout = styleClass;
    return this;
  }

  public setPadding(styleClass: string): SmzCardViewBuilder<TData> {
    this._viewData.styleClass.padding = styleClass;
    return this;
  }

  public setStyles(styleClass: string): SmzCardViewBuilder<TData> {
    this._viewData.styleClass.general = styleClass;
    return this;
  }

  public get cards(): SmzCardsBuilder<TData> {

    let styles = this._viewData.styleClass;
    this._viewData.styleClass.all = `${styles.layout} ${styles.padding} ${styles.general}`;

    return this._cardsBuilder;
  }
}

export class SmzCardsTemplateBuilder<TData, TBuilder> extends SmzBuilderUtilities<SmzCardsTemplateBuilder<TData, TBuilder>> {
  protected that = this;
  private hasTemplate = false;
  constructor(private _builder: TBuilder, private _template: SmzCardsTemplates<TData>) {
    super();
  }

  public raw(): SmzCardsRawBuilder<TData, TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsRawBuilder(this._builder, this, this._template as RawTemplate<TData>);
  }

  public imageWithDetails(): SmzCardsImageWithDetailsBuilder<TData, TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsImageWithDetailsBuilder(this._builder, this, this._template as ImageWithDetailsTemplate<TData>);
  }

  public infoA(): SmzCardsInfoABuilder<TData, TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsInfoABuilder(this._builder, this, this._template as InfoATemplate<TData>);
  }

  public get cards(): TBuilder {
    return this._builder;
  }

  public flipCard(): SmzCardsFlipCardBuilder<TData, TBuilder> {
    if (this.hasTemplate) {
      throw Error('[Smz Cards] You cannot set more than one templete.');
    }
    this.hasTemplate = true;
    return new SmzCardsFlipCardBuilder(this._builder, this, this._template as FlipCardTemplate<TData>);
  }
}
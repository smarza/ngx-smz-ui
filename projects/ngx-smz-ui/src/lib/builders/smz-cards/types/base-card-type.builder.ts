import { SmzCardsTemplates } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsTemplateBuilder } from '../template-builder';

export abstract class SmzCardsBaseTemplateBuilder<TBuilder, T extends SmzCardsBaseTemplateBuilder<TBuilder, T>> {

  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TBuilder>, protected _template: SmzCardsTemplates) {
  }

  public get template(): SmzCardsTemplateBuilder<TBuilder> {
    return this._parent;
  }
}


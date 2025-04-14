import { SmzCardsTemplates } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsTemplateBuilder } from '../template-builder';

export abstract class SmzCardsBaseTemplateBuilder<TData, TBuilder, T extends SmzCardsBaseTemplateBuilder<TData, TBuilder, T>> {

  constructor(protected _builder: TBuilder, protected _parent: SmzCardsTemplateBuilder<TData, TBuilder>, protected _template: SmzCardsTemplates<TData>) {
  }

  public get template(): SmzCardsTemplateBuilder<TData, TBuilder> {
    return this._parent;
  }
}


import { SmzCardsComponentContent } from '../../../modules/smz-cards/models/smz-cards-contents';
import { RawTemplate, SmzCardsTemplate } from '../../../modules/smz-cards/models/smz-cards-templates';
import { SmzCardsComponentBuilder } from '../column-builder';
import { SmzCardsTemplateBuilder } from '../template-builder';
import { SmzCardsBaseTemplateBuilder } from './base-card-type.builder';

export class SmzCardsRawBuilder<TData, TBuilder> extends SmzCardsBaseTemplateBuilder<TData, TBuilder, SmzCardsRawBuilder<TData, TBuilder>> {
  constructor(protected override _builder: TBuilder, protected override _parent: SmzCardsTemplateBuilder<TData, TBuilder>, protected override _template: RawTemplate<TData>) {
    super(_builder, _parent, _template);
    _template.type = SmzCardsTemplate.RAW;
  }

  public setList(component: any): SmzCardsComponentBuilder<TData, TBuilder, SmzCardsRawBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsComponentContent<TData>;
    this._template.listComponent = content;
    return new SmzCardsComponentBuilder<TData, TBuilder, SmzCardsRawBuilder<TData, TBuilder>>(this._builder, this, content, component);
  }

  public setGrid(component: any): SmzCardsComponentBuilder<TData, TBuilder, SmzCardsRawBuilder<TData, TBuilder>> {
    const content = {} as SmzCardsComponentContent<TData>;
    this._template.gridComponent = content;
    return new SmzCardsComponentBuilder<TData, TBuilder, SmzCardsRawBuilder<TData, TBuilder>>(this._builder, this, content, component);
  }

  public override get template(): SmzCardsTemplateBuilder<TData, TBuilder> {
    return this._parent;
  }

}
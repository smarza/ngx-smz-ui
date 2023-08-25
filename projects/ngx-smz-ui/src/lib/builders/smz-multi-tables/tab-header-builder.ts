import { SmzMultiTablesTab } from '../../modules/smz-multi-tables/multi-tables.state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzMultiTablesBuilder } from './state-builder';
import { SmzMultiTablesTabBuilder } from './tab-builder';

export class SmzMultiTablesTabHeaderBuilder extends SmzBuilderUtilities<SmzMultiTablesTabHeaderBuilder> {

  protected that = this;
  constructor(private _builder: SmzMultiTablesTabBuilder, private _tab: SmzMultiTablesTab) {
    super();
  }

  public setStyleClass(styleClass: string): SmzMultiTablesTabHeaderBuilder {
    this._tab.styleClass = styleClass;
    return this.that;
  }

  public setName(name: string): SmzMultiTablesTabHeaderBuilder {
    this._tab.header.label.name = name;
    return this.that;
  }

  public setNameStyleClass(styleClass: string): SmzMultiTablesTabHeaderBuilder {
    this._tab.header.label.styleClass = styleClass;
    return this.that;
  }

  public setIcon(icon: string): SmzMultiTablesTabHeaderBuilder {
    this._tab.header.icon.isVisible = true;
    this._tab.header.icon.name = icon;
    return this.that;
  }

  public setIconStyleClass(styleClass: string): SmzMultiTablesTabHeaderBuilder {
    this._tab.header.icon.styleClass = styleClass;
    return this.that;
  }

  public get header(): SmzMultiTablesTabBuilder {
    return this._builder;
  }
}

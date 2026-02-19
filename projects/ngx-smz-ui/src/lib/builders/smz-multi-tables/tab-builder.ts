import { Observable } from 'rxjs';
import { SmzMultiTablesTab } from '../../modules/smz-multi-tables/multi-tables.state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzMultiTablesBuilder } from './state-builder';
import { SmzMultiTablesTabHeaderBuilder } from './tab-header-builder';
import { SmzTableState } from '../../modules/smz-tables/models/table-state';

export class SmzMultiTablesTabBuilder extends SmzBuilderUtilities<SmzMultiTablesTabBuilder> {

  protected override that = this;
  constructor(private _builder: SmzMultiTablesBuilder, private _tab: SmzMultiTablesTab, private label: string) {
    super();

    this._tab.header.label.name = label;
  }

  public setStyleClass(styleClass: string): SmzMultiTablesTabBuilder {
    this._tab.styleClass = styleClass;
    return this.that;
  }

  public allowClose(): SmzMultiTablesTabBuilder {
    throw new Error('Closeable tabs are not supported in PrimeNG v19');
    this._tab.closable = true;
    return this.that;
  }

  public setAsSelected(): SmzMultiTablesTabBuilder {
    throw new Error('Selected tab is not supported in PrimeNG v19');
    this._tab.selected = true;
    return this.that;
  }

  public allowDuplication(): SmzMultiTablesTabBuilder {
    this._tab.allowDuplication = true;
    return this.that;
  }

  public header(): SmzMultiTablesTabHeaderBuilder {
    return new SmzMultiTablesTabHeaderBuilder(this, this._tab);
  }

  public table(items$: Observable<any>, state: SmzTableState): SmzMultiTablesTabBuilder {
    this._tab.table.items$ = items$;
    this._tab.table.state = state;
    return this.that;
  }

  public get tab(): SmzMultiTablesBuilder {
    return this._builder;
  }
}

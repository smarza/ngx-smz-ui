import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';
import { SmzTableColumn, SmzTableContentAction } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzHeaderActionsBuilder<TColumn extends SmzBaseColumnBuilder<TColumn, TData>, TData> extends SmzBuilderUtilities<SmzHeaderActionsBuilder<TColumn, TData>> {
  protected override that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzBaseColumnBuilder<TColumn, TData>) {
    super();
  }

  public add(icon: string, callback: (item: any) => void): SmzContentActionIconBuilder<TColumn, TData> {
    this._parent._column.showHeaderActions = true;
    return new SmzContentActionIconBuilder<TColumn, TData>(this._table, this._parent._column, this, icon, callback);
  }

  public setVisibility(visibilityCondition: boolean): SmzHeaderActionsBuilder<TColumn, TData> {
    this._parent._column.showHeaderActions = visibilityCondition;
    return this.that;
  }

  public get column(): SmzBaseColumnBuilder<TColumn, TData> {
    return this._parent;
  }
}

export class SmzContentActionIconBuilder<TColumn extends SmzBaseColumnBuilder<TColumn, TData>, TData> {
  private _action: SmzTableContentAction;

  constructor(protected _table: SmzTableBuilder<TData>, protected _column: SmzTableColumn, protected _parent: SmzHeaderActionsBuilder<TColumn, TData>, icon: string, callback?: (item: any) => void) {
    this._action = {
      icon,
      tooltip: null,
      condition: () => true,
      callback,
      styleClass: ''
    };
  }

  public setStyleClass(styleClass: string): SmzContentActionIconBuilder<TColumn, TData> {
    this._action.styleClass = styleClass;
    return this;
  }

  public setTooltip(tooltip: (item: any) => string): SmzContentActionIconBuilder<TColumn, TData> {
    this._action.tooltip = tooltip;
    return this;
  }

  public condition(condition: (item: any) => boolean): SmzContentActionIconBuilder<TColumn, TData> {
    this._action.condition = condition;
    return this;
  }

  public callback(callback: (item: any) => boolean): SmzContentActionIconBuilder<TColumn, TData> {

    if (this._action.callback != null) {
      throw Error('You already set the callback for this column action.');
    }

    this._action.callback = callback;
    return this;
  }

  public get action(): SmzHeaderActionsBuilder<TColumn, TData> {
    this._column.headerActions.push(this._action);
    return this._parent;
  }
}
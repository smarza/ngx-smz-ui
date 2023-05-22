import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';
import { SmzTableColumn, SmzTableContentAction } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzContentActionsBuilder<TColumn extends SmzBaseColumnBuilder<TColumn, TData>, TData> extends SmzBuilderUtilities<SmzContentActionsBuilder<TColumn, TData>> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder<TData>, protected _parent: SmzBaseColumnBuilder<TColumn, TData>) {
    super();
  }

  public add(icon: string, callback: (item: any) => void): SmzContentActionIconBuilder<TColumn, TData> {
    return new SmzContentActionIconBuilder<TColumn, TData>(this._table, this._parent._column, this, icon, callback);
  }

  public placeAtBeginning(): SmzContentActionsBuilder<TColumn, TData> {
    this._parent._column.actionsAlignment = 'begin';
    return this;
  }

  public get column(): SmzBaseColumnBuilder<TColumn, TData> {
    return this._parent;
  }
}

export class SmzContentActionIconBuilder<TColumn extends SmzBaseColumnBuilder<TColumn, TData>, TData> {
  private _action: SmzTableContentAction;

  constructor(protected _table: SmzTableBuilder<TData>, protected _column: SmzTableColumn, protected _parent: SmzContentActionsBuilder<TColumn, TData>, icon: string, callback?: (item: any) => void) {
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

  public get action(): SmzContentActionsBuilder<TColumn, TData> {
    this._column.actions.push(this._action);
    return this._parent;
  }
}
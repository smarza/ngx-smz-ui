import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';
import { SmzTableColumn, SmzTableContentAction } from '../../modules/smz-tables/models/table-column';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzContentActionsBuilder extends SmzBuilderUtilities<SmzContentActionsBuilder> {
  protected that = this;
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>) {
    super();
  }

  public add(icon: string, callback: (item: any) => void): SmzContentActionIconBuilder {
    return new SmzContentActionIconBuilder(this._table, this._parent._column, this, icon, callback);
  }

  public get column(): SmzBaseColumnBuilder<any> {
    return this._parent;
  }
}

export class SmzContentActionIconBuilder {
  private _action: SmzTableContentAction;

  constructor(protected _table: SmzTableBuilder, protected _column: SmzTableColumn, protected _parent: SmzContentActionsBuilder, icon: string, callback: (item: any) => void) {
    this._action = {
      icon,
      callback,
      styleClass: ''
    };
  }

  public setStyleClass(styleClass: string): SmzContentActionIconBuilder {
    this._action.styleClass = styleClass;
    return this;
  }

  public get action(): SmzContentActionsBuilder {
    this._column.actions.push(this._action);
    return this._parent;
  }
}
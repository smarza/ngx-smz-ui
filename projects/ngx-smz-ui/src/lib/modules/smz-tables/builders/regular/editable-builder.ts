import { SmzDropdownEditable, SmzEditableType } from '../../models/editable-types';
import { SmzTableEditableColumn } from '../../models/table-column';
import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';

export abstract class SmzBaseEditableBuilder<T extends SmzBaseEditableBuilder<T>> {

  protected _editable: SmzTableEditableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, type: SmzEditableType, property: string, data: any) {
    this._editable = {
      property,
      type,
      data,
    };

    this._table._state.editable.update.isButtonVisible = true;
    this._table._state.editable.creation.isButtonVisible = true;
    this._parent._column.editable = this._editable;
    this._table._state.editable.isEditable = true;
  }

  public disableUpdate(): SmzBaseEditableBuilder<T> {

    this._table._state.editable.update.isButtonVisible = this._table._state.columns.some(x => x.editable.type !== SmzEditableType.NONE);

    return this;
  }

  public disableCreation(): SmzBaseEditableBuilder<T> {

    this._table._state.editable.creation.isButtonVisible = this._table._state.columns.some(x => x.editable.type !== SmzEditableType.NONE);

    return this;
  }

  public get column(): SmzBaseColumnBuilder<any> {
    return this._parent;
  }
}


export class SmzEditableCollectionBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>) {
    new SmzTextEditableBuilder(this._table, this._parent, this._parent._column.field);
  }

  public dropdown(property: string): SmzDropdownEditableBuilder {
    return new SmzDropdownEditableBuilder(this._table, this._parent, property);
  }

  public get column(): SmzBaseColumnBuilder<any> {
    return this._parent;
  }
}

export class SmzTextEditableBuilder extends SmzBaseEditableBuilder<SmzTextEditableBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, property: string) {
    super(_table, _parent, SmzEditableType.TEXT, property, {});
  }
}

export class SmzDropdownEditableBuilder extends SmzBaseEditableBuilder<SmzDropdownEditableBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, property: string, placeholder = 'Selecione uma opção') {
    super(_table, _parent, SmzEditableType.DROPDOWN, property, {});

    (this._editable.data as SmzDropdownEditable).placeholder = placeholder;
  }

  public setOptions(options: any[]): SmzDropdownEditableBuilder {
    const data: SmzDropdownEditable = this._editable.data as SmzDropdownEditable;

    data.sourceType = 'object';
    data.sourceData = options;

    return this;
  }

  public setSelector(selector: any): SmzDropdownEditableBuilder {
    const data: SmzDropdownEditable = this._editable.data as SmzDropdownEditable;

    data.sourceType = 'selector';
    data.sourceData = selector;

    return this;
  }
}
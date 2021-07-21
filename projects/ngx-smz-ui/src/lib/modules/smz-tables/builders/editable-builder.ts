import { SmzDropdownEditable, SmzEditableType } from '../models/editable-types';
import { SmzTableEditableColumn } from '../models/table-column';
import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';

export abstract class SmzBaseEditableBuilder<T extends SmzBaseEditableBuilder<T>> {

  protected _editable: SmzTableEditableColumn = null;

  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, type: SmzEditableType, property: string, data: any) {
    this._editable = {
      property,
      type,
      data,
      validatorsPreset: {
        isRequired: true,
      },
      defaultCreationValue: null
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

  public removeRequirement(): SmzBaseEditableBuilder<T> {

    this._editable.validatorsPreset.isRequired = false;

    return this;
  }

  public setMinValidator(min: number): SmzBaseEditableBuilder<T> {

    this._editable.validatorsPreset.min = min;

    return this;
  }

  public setMinLengthValidator(minLength: number): SmzBaseEditableBuilder<T> {

    this._editable.validatorsPreset.minLength = minLength;

    return this;
  }

  public setMaxValidator(max: number): SmzBaseEditableBuilder<T> {

    this._editable.validatorsPreset.max = max;

    return this;
  }

  public setMaxLengthValidator(maxLength: number): SmzBaseEditableBuilder<T> {

    this._editable.validatorsPreset.maxLength = maxLength;

    return this;
  }

  public get column(): SmzBaseColumnBuilder<any> {
    return this._parent;
  }
}


export class SmzEditableCollectionBuilder {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>) {

  }

  public text(property: string = this._parent._column.field): SmzTextEditableBuilder {
    return new SmzTextEditableBuilder(this._table, this._parent, property);
  }

  public switch(property: string = this._parent._column.field): SmzSwitchEditableBuilder {
    return new SmzSwitchEditableBuilder(this._table, this._parent, property);
  }

  public dropdown(property: string = this._parent._column.field): SmzDropdownEditableBuilder {
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

export class SmzSwitchEditableBuilder extends SmzBaseEditableBuilder<SmzSwitchEditableBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, property: string) {
    super(_table, _parent, SmzEditableType.SWITCH, property, {});
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
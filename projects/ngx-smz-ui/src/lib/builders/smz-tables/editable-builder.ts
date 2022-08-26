import { EditableChanges, flattenMapResults } from '../../modules/smz-tables/models/editable-model';
import { SmzDropdownEditable, SmzEditableType, SmzNumberEditable } from '../../modules/smz-tables/models/editable-types';
import { SmzTableEditableColumn } from '../../modules/smz-tables/models/table-column';
import { SmzBaseColumnBuilder } from './column-builder';
import { SmzTableBuilder } from './state-builder';


export class SmzEditableTableBuilder {
  constructor(private _tableBuilder: SmzTableBuilder) {
    _tableBuilder._state.editable.isEditable = true;
    this._tableBuilder._state.actions.customActions.columnWidth += 150;
  }

  public useFlattenResults<T>(): SmzEditableTableBuilder {
    this._tableBuilder._state.editable.mapResults.push((data, changes: EditableChanges<any>) => flattenMapResults(data, changes));
    return this;
  }

  public addMappingResults<T>(mapFunction: (data: T, changes: EditableChanges<T>) => any): SmzEditableTableBuilder {
    this._tableBuilder._state.editable.mapResults.push(mapFunction);
    return this;
  }

  public setCreationAction(action: any, claim?: string, overrideActionPayload?: (row: any) => any): SmzEditableTableBuilder {

    this._tableBuilder._state.editable.actions.creation = action;
    this._tableBuilder._state.editable.creation.isButtonVisible = true;
    this._tableBuilder._state.editable.creation.accessClaim = claim;
    this._tableBuilder._state.editable.creation.overrideActionPayloadCallback = overrideActionPayload;

    return this;
  }

  public onCreationInit(onInit: () => void): SmzEditableTableBuilder {
    this._tableBuilder._state.editable.creation.onInit = onInit;
    return this;
  }

  public setUpdateAction(action: any, claim?: string, overrideActionPayload?: (row: any) => any): SmzEditableTableBuilder {

    this._tableBuilder._state.editable.actions.update = action;
    this._tableBuilder._state.editable.update.isButtonVisible = true;
    this._tableBuilder._state.editable.update.accessClaim = claim;
    this._tableBuilder._state.editable.update.overrideActionPayloadCallback = overrideActionPayload;

    return this;
  }

  public onUpdateInit(onInit: (row: any) => void): SmzEditableTableBuilder {
    this._tableBuilder._state.editable.update.onInit = onInit;
    return this;
  }

  public setRemoveAction(action: any, claim?: string, overrideActionPayload?: (row: any) => any): SmzEditableTableBuilder {

    this._tableBuilder._state.editable.actions.remove = action;
    this._tableBuilder._state.editable.remove.isButtonVisible = true;
    this._tableBuilder._state.editable.remove.accessClaim = claim;
    this._tableBuilder._state.editable.remove.overrideActionPayloadCallback = overrideActionPayload;

    return this;
  }

  public onRemoveInit(onInit: (row: any) => void): SmzEditableTableBuilder {
    this._tableBuilder._state.editable.remove.onInit = onInit;
    return this;
  }

  public get table(): SmzTableBuilder {

    const actions = this._tableBuilder._state.editable.actions;
    if (actions.creation == null && actions.remove == null && actions.update == null) {
      throw Error('You did not set any actions at editable builder.');
    }

    return this._tableBuilder;
  }

}


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

    // this._table._state.editable.update.isButtonVisible = false;
    // this._table._state.editable.creation.isButtonVisible = false;
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

  public number(property: string = this._parent._column.field): SmzNumberEditableBuilder {
    return new SmzNumberEditableBuilder(this._table, this._parent, property);
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

export class SmzNumberEditableBuilder extends SmzBaseEditableBuilder<SmzNumberEditableBuilder> {
  constructor(protected _table: SmzTableBuilder, protected _parent: SmzBaseColumnBuilder<any>, property: string) {
    super(_table, _parent, SmzEditableType.NUMBER, property, {
      mode: 'decimal',
      minFractionDigits: null,
      maxFractionDigits: null,
      currency: undefined,
      useGrouping: false,
      allowEmpty: true,
      showClear: false,
      showButtons: false,
      prefix: null,
      suffix: null
    });
  }

  public setDecimal(digits: number): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;

    data.mode = 'decimal';
    data.minFractionDigits = digits;
    data.maxFractionDigits = digits;

    return this;
  }

  public setFraction(minFractionDigits: number, maxFractionDigits: number): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;

    data.mode = 'decimal';
    data.minFractionDigits = minFractionDigits;
    data.maxFractionDigits = maxFractionDigits;

    return this;
  }

  public addPrefix(prefix: string): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.prefix = prefix;

    return this;
  }

  public addSufix(suffix: string): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.suffix = suffix;

    return this;
  }

  public showSpinners(): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.showButtons = true;

    return this;
  }

  public showClear(): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.showClear = true;

    return this;
  }

  public forbidEmpty(): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.allowEmpty = false;

    return this;
  }

  public useGrouping(): SmzNumberEditableBuilder {
    const data: SmzNumberEditable = this._editable.data as SmzNumberEditable;
    data.useGrouping = true;

    return this;
  }

}
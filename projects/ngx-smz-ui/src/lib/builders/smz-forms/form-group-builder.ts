import { SmzCalendarControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzContentMaskControl, SmzControlType, SmzCurrencyControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzLinkedMultiSelectControl, SmzListControl, SmzMaskControl, SmzMultiSelectControl, SmzNumberControl, SmzPasswordControl, SmzRadioControl, SmzSwitchControl, SmzTagAreaControl, SmzTextAreaControl, SmzTextControl, SmzControlTypes, SmzTextButtonControl } from '../../modules/smz-forms/models/control-types';
import { SimpleEntity, SimpleParentEntity } from '../../common/models/simple-named-entity';
import { SmzFormBuilder } from './form-builder';
import { SmzFormGroup, SmzFormsResponse } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormsBaseControl } from '../../modules/smz-forms/models/controls';
import { ValidatorFn, Validators } from '@angular/forms';
import { SmzTextPattern } from '../../modules/smz-forms/models/text-patterns';
import { MustBeUnique, MustMatch } from '../../common/utils/custom-validations';
import { GlobalInjector } from '../../common/services/global-injector';
import { SmzFormViewdata } from '../../modules/smz-forms/models/form-viewdata';
import { Observable } from 'rxjs';
import sortBy from 'lodash-es/sortBy';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { UUID } from 'angular2-uuid';

export class SmzFormGroupBuilder<TResponse> extends SmzBuilderUtilities<SmzFormGroupBuilder<TResponse>> {
  protected that = this;
  private defaultConfig = GlobalInjector.config.dialogs;
  constructor(public _formBuilder: SmzFormBuilder<TResponse>, public group: SmzFormGroup) {
    super();
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12'): SmzFormGroupBuilder<TResponse> {
    const template = getSmzTemplate(breakpoint, colType) as any;
    this.group.template = { ...this.group.template, ...template };
    return this;
  }

  public reorder(...properties: string[]): SmzFormGroupBuilder<TResponse> {
    this.group.children = sortBy(this.group.children, (c) => properties.indexOf(c.propertyName) !== -1? properties.indexOf(c.propertyName) : this.group.children.length);
    return this;
  }

  public calendar(property: string, label?: string, defaultValue?: Date): SmzFormCalendarBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for calendar.')
      }

      input = {
        propertyName: property, type: SmzControlType.CALENDAR, name: label,
        defaultValue: defaultValue, showIcon: true, showButtonBar: true
      };
      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormCalendarBuilder(this, input as SmzCalendarControl);
  }

  public checkbox(property: string, label?: string, defaultValue?: boolean): SmzFormCheckboxBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for checkbox.')
      }

      input = {
        propertyName: property, type: SmzControlType.CHECKBOX, name: label,
        defaultValue: defaultValue
      };
      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormCheckboxBuilder(this, input as SmzCheckBoxControl);
  }

  public checkboxGroup<T>(property: string, label: string, options: SimpleEntity<T>[], defaultValue?: T[]): SmzFormCheckboxGroupBuilder<T,TResponse> {
    const input: SmzCheckBoxGroupControl<T> = {
      propertyName: property, type: SmzControlType.CHECKBOX_GROUP, name: label,
      defaultValue: defaultValue, options: options
    };

    this.group.children.push(input);
    return new SmzFormCheckboxGroupBuilder<T,TResponse>(this, input);
  }

  public dropdown<T>(property: string, label?: string, options?: SimpleEntity<T>[], defaultValue?: T): SmzFormDropdownBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzDropDownControl<T>;

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for dropdown.')
      }

      input = {
        propertyName: property, type: SmzControlType.DROPDOWN, name: label,
        defaultValue: defaultValue, options: options
      };

      this.group.children.push(input);
    }
    else {

      input.name = label ?? input.name;
      input.options = options ?? input.options;
      input.defaultValue = defaultValue ?? input.defaultValue;

    }

    return new SmzFormDropdownBuilder<T,TResponse>(this, input as SmzDropDownControl<T>);
  }

  public linkedDropdown<T>(property: string, dependsOn: string, label?: string, options?: SimpleParentEntity<T>[], defaultValue?: T): SmzFormLinkedDropdownBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzLinkedDropDownControl<T>;

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for linked dropdown.')
      }

      input = {
        propertyName: property, type: SmzControlType.LINKED_DROPDOWN, name: label, advancedSettings: { overrideResponseFormat: this.form._state.behaviors.flattenResponse ? 'flat' : 'object' },
        defaultValue: defaultValue, options: options, dependsOn: { propertyName: dependsOn, formId: this._formBuilder._state.formId }
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.options = options ?? input.options;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormLinkedDropdownBuilder<T,TResponse>(this, input as SmzLinkedDropDownControl<T>);
  }

  public multiselect<T>(property: string, label?: string, options?: SimpleEntity<T>[], defaultValue?: T[]): SmzFormMultiselectBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzMultiSelectControl<T>;

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for multiselect.')
      }

      input = {
        propertyName: property, type: SmzControlType.MULTI_SELECT, name: label,
        defaultValue: defaultValue, options: options,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.options = options ?? input.options;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormMultiselectBuilder<T,TResponse>(this, input as SmzMultiSelectControl<T>);
  }

  public linkedMultiselect<T>(property: string, dependsOn: string, label?: string, options?: SimpleParentEntity<T>[], defaultValue?: T[]): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    const input: SmzLinkedMultiSelectControl<T> = {
      propertyName: property, type: SmzControlType.LINKED_MULTISELECT, name: label,
      defaultValue: defaultValue, options: options, dependsOn: { propertyName: dependsOn, formId: this._formBuilder._state.formId }
    };

    this.group.children.push(input);
    return new SmzFormLinkedMultiselectBuilder<T,TResponse>(this, input);
  }

  public colorPicker(property: string, label?: string, defaultValue?: string): SmzFormColorPickerBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for colorPicker')
      }

      input = {
        propertyName: property, type: SmzControlType.COLOR_PICKER, name: label,
        defaultValue: defaultValue,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormColorPickerBuilder(this, input as SmzColorPickerControl);
  }

  public currency(property: string, label?: string, defaultValue?: string): SmzFormCurrencyBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for currency')
      }

      input = {
        propertyName: property, type: SmzControlType.CURRENCY, name: label,
        defaultValue: defaultValue,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormCurrencyBuilder(this, input as SmzCurrencyControl);
  }

  public number(property: string, label?: string, defaultValue?: number): SmzFormNumberBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for currency')
      }

      input = {
        propertyName: property, type: SmzControlType.NUMBER, name: label,
        defaultValue: defaultValue,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormNumberBuilder(this, input as SmzNumberControl);
  }

  public radioGroup<T>(property: string, label?: string, options?: SimpleEntity<T>[], defaultValue?: T): SmzFormRadioGroupBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzRadioControl<T>;

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for radioGroup.')
      }

      input = {
        propertyName: property, type: SmzControlType.RADIO, name: label,
        options: options, defaultValue: defaultValue
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.options = options ?? input.options;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormRadioGroupBuilder<T,TResponse>(this, input as SmzRadioControl<T>);
  }

  public switch(property: string, label?: string, defaultValue?: boolean): SmzFormSwitchBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for switch')
      }

      input = {
        propertyName: property, type: SmzControlType.SWITCH, name: label,
        defaultValue: defaultValue,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormSwitchBuilder(this, input as SmzSwitchControl);
  }

  public textArea(property: string, label?: string, defaultValue?: string): SmzFormTextAreaBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for textArea')
      }

      input = {
        propertyName: property, type: SmzControlType.TEXT_AREA, name: label,
        defaultValue: defaultValue
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormTextAreaBuilder(this, input as SmzTextAreaControl);
  }

  public contentMask(property: string, label?: string, defaultValue?: string): SmzFormContentMaskBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzContentMaskControl;

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for contentMask')
      }

      const defaults = this.defaultConfig.forms.controlTypes[SmzControlType.CONTENT_MASK] as SmzContentMaskControl;

      input = {
        ...defaults,
        propertyName: property, type: SmzControlType.CONTENT_MASK,
        name: label,
        defaultValue: defaultValue,
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormContentMaskBuilder(this, input as SmzContentMaskControl);
  }

  public tagArea(property: string, label: string, defaultValue?: string): SmzFormTagAreaBuilder<TResponse> {
    const input: SmzTagAreaControl = {
      propertyName: property, type: SmzControlType.TAG_AREA, name: label,
      config: {
        tagCharacteres: {
          open: '[',
          close: ']'
        },
        options: []
      },
      defaultValue: defaultValue,
      textAreaRows: 5
    };

    this.group.children.push(input);
    return new SmzFormTagAreaBuilder(this, input);
  }

  public text(property: string, label?: string, defaultValue?: string): SmzFormTextBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for text')
      }

      input = {
        propertyName: property, type: SmzControlType.TEXT, name: label,
        defaultValue: defaultValue,
        hideName: false
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormTextBuilder(this, input as SmzTextControl);
  }

  public textButton(property: string, label?: string, defaultValue?: string, callback?: (data: SmzFormsResponse<unknown>, utils: SmzFormViewdata) => Observable<{ isValid: boolean, messages?: string[] }>): SmzFormTextButtonBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzTextButtonControl;

    if (input == null) {

      if (label == null) throw Error('Label is required for text button')
      if (callback == null) throw Error('Callback is required for text button')

      input = {
        propertyName: property, type: SmzControlType.TEXT_BUTTON, name: label,
        defaultValue,
        callback,
        isButtonValid: false,
        buttonMessages: [],
        hideName: false,
        icon: 'fa-solid fa-rotate-right',
        placeholder: '',
        styleClass: 'p-button-success',
        clearButtonMessageOnChanges: true
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormTextButtonBuilder(this, input as SmzTextButtonControl);
  }

  public file(property: string, label?: string): SmzFormFileBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for file')
      }

      input = {
        propertyName: property, type: SmzControlType.FILE, name: label,
        defaultValue: null,
        fileAccept: null,
        maxFileSize: null,
        thumbnailSize: '90px',
        allowZoom: true,
        dragIconClass: 'pi pi-upload text-primary-color',
        showFileSize: true,
        shortenLength: 10,
        shortenSeparator: '...',
        outputFormat: 'base64'
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
    }

    return new SmzFormFileBuilder(this, input as SmzFileControl);
  }

  public list(property: string, label?: string, defaultValue?: string[] | number[]): SmzFormListBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      input = {
        propertyName: property,
        type: SmzControlType.LIST,
        name: label,
        defaultValue,
        height: '200px',
        showFilter: false,
        askBeforeRemoveItem: false,
        showAddButton: false,
        allowBatchCreation: false,
        showRemoveButton: false,
        showEditButton: false,
        showSortButton: false,
        showMoveButton: false,
        showClearButton: false,
        editMode: 'inline',
        hideName: false,
        emptyMessage: 'Lista Vazia',
        crud: {
          inputData: {},
          validateForUniqueValues: false
        },
        styleClass: ''
      };

      this.group.children.push(input);
    }
    else {
      if (label != null || defaultValue != null) {
        throw Error('Label, defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormListBuilder(this, input as SmzListControl);
  }

  public mask(property: string, label?: string, defaultValue?: string): SmzFormMaskBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for mask')
      }

      input = {
        propertyName: property, type: SmzControlType.TEXT_MASK, name: label,
        defaultValue: defaultValue,
        exportPattern: null
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormMaskBuilder(this, input as SmzMaskControl);
  }

  public password(property: string, label?: string, defaultValue?: string): SmzFormPasswordBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for password')
      }

      input = {
        propertyName: property, type: SmzControlType.PASSWORD, name: label,
        defaultValue: defaultValue,
        feedback: false,
        toggleMask: false,
        promptLabel: 'Digite a senha',
        weakLabel: 'Fraca',
        mediumLabel: 'Moderada',
        strongLabel: 'Forte',
        mediumRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
        strongRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
        advancedSettings: { validators: [] }
      };

      this.group.children.push(input);
    }
    else {
      input.name = label ?? input.name;
      input.defaultValue = defaultValue ?? input.defaultValue;
    }

    return new SmzFormPasswordBuilder(this, input as SmzPasswordControl);
  }

  public addPasswordConfirmation (property: string, label?: string): SmzFormPasswordBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property + '_confirmation');

    if (input == null) {

      if (label == null) {
        throw Error('Confirmation label is required for password confirmation')
      }

      input = {
        propertyName: property + '_confirmation', type: SmzControlType.PASSWORD, name: label,
        defaultValue: null,
        feedback: false,
        toggleMask: false,
        promptLabel: 'Confirme a senha',
        advancedSettings: {
          validators : [MustMatch(property)],
          validationMessages: [{type: 'mustmatch', message: 'As senhas não são iguais.'}]
        }
      };

      this.group.children.push(input);
    }
    else {
      if (label != null) {
        throw Error('Label come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormPasswordBuilder(this, input as SmzPasswordControl);
  }

  public get form(): SmzFormBuilder<TResponse> {
    return this._formBuilder;
  }
}

export class SmzFormInputBuilder<TInput, TResponse> {
  protected that: TInput;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _input: SmzFormsBaseControl) {
    if (this._input.validatorsPreset == null) {
      this._input.validatorsPreset = { isRequired: false, max: null, maxLength: null, min: null, minLength: null };
    }

    if (this._input.advancedSettings == null) {
      this._input.advancedSettings = { };
    }
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12'): TInput {
    const template = getSmzTemplate(breakpoint, colType) as any;
    this._input.template = { ...this._input.template, ...template };
    return this.that;
  }

  public hide(condition?: boolean): TInput {
    this._input.isVisible = condition ?? false;
    return this.that;
  }

  public disable(condition?: boolean): TInput {
    this._input.isDisabled = condition ?? true;
    return this.that;
  }

  public excludeFromResponse(): TInput {
    this._input.advancedSettings.excludeFromResponse = true;
    return this.that;
  }

  public overrideResponseFormat(format: 'flat' | 'object'): TInput {
    this._input.advancedSettings.overrideResponseFormat = format;
    return this.that;
  }

  public setVisibilityCondition(inputDependencyName: string, reversed: boolean, conditions?: any[]): TInput {
    this._input.visibilityDependsOn = {
      propertyName: inputDependencyName,
      reversed,
      condition: conditions?.length === 1 ? conditions[0] : null,
      conditions: conditions?.length > 1 ? conditions : null
    };
    return this.that;
  }

  public addDataDependency(inputDependencyName: string, condition: 'some' | 'none', matchValues: any[], callback: (control: SmzFormsBaseControl) => void): TInput {

    if (this._input.dataDependency == null) this._input.dataDependency = [];

    this._input.dataDependency.push({
      propertyName: inputDependencyName,
      condition,
      matchValues,
      callback
    });

    return this.that;
  }

  public validators(): SmzFormInputValidatorBuilder<TInput, TResponse> {
    return new SmzFormInputValidatorBuilder(this.that, this._input, this._groupBuilder);
  }

  public placeAt(position: 'after' | 'before', propertyName: string): TInput {

    if (propertyName == this._input.propertyName) {
      throw Error(`Source and destiny input cant be the same to placeAt`);
    }

    const destinyIndex = position == 'after' ? this._groupBuilder.group.children.findIndex(x => x.propertyName == propertyName) + 1:
      this._groupBuilder.group.children.findIndex(x => x.propertyName == propertyName);

    if (destinyIndex == -1) {
      throw Error(`Destiny property ${propertyName} does not exist do place ${this._input.propertyName} after`);
    }

    var sourceIndex = this._groupBuilder.group.children.findIndex(x => x.propertyName == this._input.propertyName);

    if (position == 'after' && sourceIndex == destinyIndex || position == 'before' && sourceIndex == destinyIndex -1)
    {
      throw Error(`Input ${this._input.propertyName} is already in the desired position`);
    }

    this._groupBuilder.group.children[sourceIndex] = null;

    this._groupBuilder.group.children.splice(destinyIndex, 0, this._input);

    this._groupBuilder.group.children = this._groupBuilder.group.children.filter(x => x != null);

    return this.that;
  }

  public get group(): SmzFormGroupBuilder<TResponse> {
    return this._groupBuilder;
  }
}

export class SmzFormCalendarBuilder<TResponse> extends SmzFormInputBuilder<SmzFormCalendarBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _calendarInput: SmzCalendarControl) {
    super(_groupBuilder, _calendarInput);

    _calendarInput.timeOnly = false;
    _calendarInput.showTime = false;
  }

  public enableTouchUI(): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.touchUI = true;
    return this;
  }

  public setDateFormat(format: string): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.dateFormat = format;
    return this;
  }

  public useTodayAsDefaultValue(): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.defaultValue = new Date();
    return this;
  }

  public useTimeOnly(): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.timeOnly = true;
    return this;
  }

  public useDateAndTime(): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.showTime = true;
    return this;
  }
}

export class SmzFormCheckboxBuilder<TResponse> extends SmzFormInputBuilder<SmzFormCheckboxBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _checkboxInput: SmzCheckBoxControl) {
    super(_groupBuilder, _checkboxInput);
  }
}

export class SmzFormColorPickerBuilder<TResponse> extends SmzFormInputBuilder<SmzFormColorPickerBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _colorPickerInput: SmzColorPickerControl) {
    super(_groupBuilder, _colorPickerInput);
  }
}

export class SmzFormCurrencyBuilder<TResponse> extends SmzFormInputBuilder<SmzFormCurrencyBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _currencyInput: SmzCurrencyControl) {
    super(_groupBuilder, _currencyInput);
  }
}

export class SmzFormSwitchBuilder<TResponse> extends SmzFormInputBuilder<SmzFormSwitchBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _switchInput: SmzSwitchControl) {
    super(_groupBuilder, _switchInput);
  }
}

export class SmzFormCheckboxGroupBuilder<T,TResponse> extends SmzFormInputBuilder<SmzFormCheckboxGroupBuilder<T,TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _checkboxGroupInput: SmzCheckBoxGroupControl<T>) {
    super(_groupBuilder, _checkboxGroupInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormCheckboxGroupBuilder<T,TResponse> {
    this._checkboxGroupInput.options.push(option);
    return this;
  }
}

export class SmzFormDropdownBuilder<T, TResponse> extends SmzFormInputBuilder<SmzFormDropdownBuilder<T, TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _dropdownInput: SmzDropDownControl<T>) {
    super(_groupBuilder, _dropdownInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormDropdownBuilder<T,TResponse> {
    this._dropdownInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormDropdownBuilder<T,TResponse> {
    this._dropdownInput.showFilter = true;
    this._dropdownInput.autofocusFilter = false;
    return this;
  }

  public autofocusFilter(): SmzFormDropdownBuilder<T,TResponse> {

    if (!this._dropdownInput.showFilter) {
      throw Error("You need to call `showFilter` before enabling the autofocusFilter");
    }

    this._dropdownInput.autofocusFilter = true;

    return this;
  }

  public showClear(): SmzFormDropdownBuilder<T,TResponse> {
    this._dropdownInput.showClear = true;
    return this;
  }
}

export class SmzFormLinkedDropdownBuilder<T,TResponse> extends SmzFormInputBuilder<SmzFormLinkedDropdownBuilder<T,TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _linkedDropdownInput: SmzLinkedDropDownControl<T>) {
    super(_groupBuilder, _linkedDropdownInput);
  }

  public addOption(option: SimpleParentEntity<T>): SmzFormLinkedDropdownBuilder<T,TResponse> {
    this._linkedDropdownInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormLinkedDropdownBuilder<T,TResponse> {
    this._linkedDropdownInput.showFilter = true;
    this._linkedDropdownInput.autofocusFilter = false;
    return this;
  }

  public autofocusFilter(): SmzFormLinkedDropdownBuilder<T,TResponse> {

    if (!this._linkedDropdownInput.showFilter) {
      throw Error("You need to call `showFilter` before enabling the autofocusFilter");
    }

    this._linkedDropdownInput.autofocusFilter = true;

    return this;
  }

  public showClear(): SmzFormLinkedDropdownBuilder<T,TResponse> {
    this._linkedDropdownInput.showClear = true;
    return this;
  }

}

export class SmzFormLinkedMultiselectBuilder<T,TResponse> extends SmzFormInputBuilder<SmzFormLinkedMultiselectBuilder<T,TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _linkedMultiselectInput: SmzLinkedMultiSelectControl<T>) {
    super(_groupBuilder, _linkedMultiselectInput);
  }

  public addOption(option: SimpleParentEntity<T>): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    this._linkedMultiselectInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    this._linkedMultiselectInput.showFilter = true;
    this._linkedMultiselectInput.autofocusFilter = false;
    return this;
  }

  public autofocusFilter(): SmzFormLinkedMultiselectBuilder<T,TResponse> {

    if (!this._linkedMultiselectInput.showFilter) {
      throw Error("You need to call `showFilter` before enabling the autofocusFilter");
    }

    this._linkedMultiselectInput.autofocusFilter = true;

    return this;
  }

  public showClear(): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    this._linkedMultiselectInput.showClear = true;
    return this;
  }

}

export class SmzFormMultiselectBuilder<T,TResponse> extends SmzFormInputBuilder<SmzFormMultiselectBuilder<T,TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _multiselectInput: SmzMultiSelectControl<T>) {
    super(_groupBuilder, _multiselectInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormMultiselectBuilder<T,TResponse> {
    this._multiselectInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormMultiselectBuilder<T,TResponse> {
    this._multiselectInput.showFilter = true;
    this._multiselectInput.autofocusFilter = false;
    return this;
  }

  public autofocusFilter(): SmzFormMultiselectBuilder<T,TResponse> {

    if (!this._multiselectInput.showFilter) {
      throw Error("You need to call `showFilter` before enabling the autofocusFilter");
    }

    this._multiselectInput.autofocusFilter = true;

    return this;
  }

  public showClear(): SmzFormMultiselectBuilder<T,TResponse> {
    this._multiselectInput.showClear = true;
    return this;
  }
}

export class SmzFormRadioGroupBuilder<T,TResponse> extends SmzFormInputBuilder<SmzFormRadioGroupBuilder<T,TResponse> , TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _radioGroupInput: SmzRadioControl<T>) {
    super(_groupBuilder, _radioGroupInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormRadioGroupBuilder<T,TResponse> {
    this._radioGroupInput.options.push(option);
    return this;
  }
}

export class SmzFormTagAreaBuilder<TResponse> extends SmzFormInputBuilder<SmzFormTagAreaBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _tagAreaInput: SmzTagAreaControl) {
    super(_groupBuilder, _tagAreaInput);
  }

  public setRows(rows: number): SmzFormTagAreaBuilder<TResponse> {
    this._tagAreaInput.textAreaRows = rows;
    return this;
  }

  public setSaveFormat(format: SmzTextPattern): SmzFormTagAreaBuilder<TResponse> {
    this._tagAreaInput.exportPattern = format;
    return this;
  }

  public setTagCharacters(open: string, close: string): SmzFormTagAreaBuilder<TResponse> {
    const config = this._tagAreaInput.config;
    if (config == null) {
      this._tagAreaInput.config = { tagCharacteres: { open, close }, options: [] };
    }
    else {
      this._tagAreaInput.config.tagCharacteres = { open, close };
    }
    return this;
  }

  public addOption(key: string, data: { key: string, value: string }[]): SmzFormTagAreaBuilder<TResponse> {
    const config = this._tagAreaInput.config;
    if (config == null) {
      this._tagAreaInput.config = { tagCharacteres: null, options: [] };
    }

    this._tagAreaInput.config.options.push({ key, data })
    return this;
  }
}

export class SmzFormNumberBuilder<TResponse> extends SmzFormInputBuilder<SmzFormNumberBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _numberInput: SmzNumberControl) {
    super(_groupBuilder, _numberInput);

    this._numberInput.minFractionDigits = 0;
    this._numberInput.useGrouping = false;
  }

  public setFraction(minFractionDigits: number = 0, maxFractionDigits?: number): SmzFormNumberBuilder<TResponse> {
    this._numberInput.minFractionDigits = minFractionDigits;
    this._numberInput.maxFractionDigits = maxFractionDigits;

    this._numberInput.useFraction = true;
    return this;
  }

  public useGrouping(): SmzFormNumberBuilder<TResponse> {
    this._numberInput.useGrouping = true;
    this._numberInput.useFraction = true;

    return this;
  }

  public setLocale(locale: 'pt-BR'): SmzFormNumberBuilder<TResponse> {
    this._numberInput.locale = 'pt-BR';
    this._numberInput.useFraction = true;
    return this;
  }

}

export class SmzFormTextAreaBuilder<TResponse> extends SmzFormInputBuilder<SmzFormTextAreaBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _textAreaInput: SmzTextAreaControl) {
    super(_groupBuilder, _textAreaInput);
  }

  public setRows(rows: number): SmzFormTextAreaBuilder<TResponse> {
    this._textAreaInput.textAreaRows = rows;
    return this;
  }

  public setSaveFormat(format: SmzTextPattern): SmzFormTextAreaBuilder<TResponse> {
    this._textAreaInput.exportPattern = format;
    return this;
  }
}

export class SmzFormContentMaskBuilder<TResponse> extends SmzFormInputBuilder<SmzFormContentMaskBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _contentMaskInput: SmzContentMaskControl) {
    super(_groupBuilder, _contentMaskInput);
  }

  public setRows(rows: number): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.textAreaRows = rows;
    return this;
  }

  public setQuickAction(triggerKeyCode: number, callback: () => {}): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.quickActions.push({ keycode: triggerKeyCode, callback });
    return this;
  }

  // public changeVariableId(variableId: string): SmzFormContentMaskBuilder<TResponse> {
  //   this._contentMaskInput.variableId = variableId;
  //   return this;
  // }

  public setInputClass(classStyle: string): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.inputClass = classStyle;
    return this;
  }

  public setTagClass(classStyle: string): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.tagClass = classStyle;
    return this;
  }

  public setVariable(begin: string, end: string): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.variableBegin = begin;
    this._contentMaskInput.variableEnd = end;
    return this;
  }

  public exportHtmlNewLine(): SmzFormContentMaskBuilder<TResponse> {
    this._contentMaskInput.exportHtmlNewLine = true;
    return this;
  }

}


export class SmzFormTextBuilder<TResponse> extends SmzFormInputBuilder<SmzFormTextBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _textInput: SmzTextControl) {
    super(_groupBuilder, _textInput);
  }

  public hideLabel(): SmzFormTextBuilder<TResponse> {
    this._textInput.hideName = true;
    return this;
  }

  public setSaveFormat(format: SmzTextPattern): SmzFormTextBuilder<TResponse> {
    this._textInput.exportPattern = format;
    return this;
  }

  public autoFocus(): SmzFormTextBuilder<TResponse> {
    this._textInput.autoFocus = true;
    return this;
  }
}


export class SmzFormTextButtonBuilder<TResponse> extends SmzFormInputBuilder<SmzFormTextButtonBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _textButtonInput: SmzTextButtonControl) {
    super(_groupBuilder, _textButtonInput);
  }

  public hideLabel(): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.hideName = true;
    return this;
  }

  public useLabel(label: string): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.label = label;
    this._textButtonInput.icon = null;
    return this;
  }

  public useIcon(icon: string): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.label = null;
    this._textButtonInput.icon = icon;
    return this;
  }

  public setPlaceholder(placeholder: string): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.placeholder = placeholder;
    return this;
  }

  public setStyle(styleClass: string): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.styleClass = styleClass;
    return this;
  }

  public persistMessages(styleClass: string): SmzFormTextButtonBuilder<TResponse> {
    this._textButtonInput.clearButtonMessageOnChanges = false;
    return this;
  }

}

export class SmzFormFileBuilder<TResponse> extends SmzFormInputBuilder<SmzFormFileBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _fileInput: SmzFileControl) {
    super(_groupBuilder, _fileInput);
  }

  public setDefaultFile(base64: string, filename: string, mimetype: string): SmzFormFileBuilder<TResponse> {
    this._fileInput.defaultValue = base64;
    this._fileInput.defaultValueFilename = filename;
    this._fileInput.defaultValueMimetype = mimetype;
    return this;
  }

  public acceptImages(): SmzFormFileBuilder<TResponse> {
    if(this._fileInput.fileAccept == null) {
      this._fileInput.fileAccept = 'image/*';
    }
    else {
      this._fileInput.fileAccept += ',image/*'
    }
    return this;
  }

  public acceptPdf(): SmzFormFileBuilder<TResponse> {
    if(this._fileInput.fileAccept == null) {
      this._fileInput.fileAccept = 'application/pdf';
    }
    else {
      this._fileInput.fileAccept += ',application/pdf'
    }
    return this;
  }

  public acceptXlsx(): SmzFormFileBuilder<TResponse> {
    if(this._fileInput.fileAccept == null) {
      this._fileInput.fileAccept = '.xlsx, .xls';
    }
    else {
      this._fileInput.fileAccept += ',.xlsx,.xls'
    }
    return this;
  }

  public acceptCsv(): SmzFormFileBuilder<TResponse> {
    if(this._fileInput.fileAccept == null) {
      this._fileInput.fileAccept = 'application/csv';
    }
    else {
      this._fileInput.fileAccept += ',application/csv'
    }
    return this;
  }

  public accept(formats: string): SmzFormFileBuilder<TResponse> {
    if(this._fileInput.fileAccept != null) {
      throw Error('This method can´t be used together with other accept method.');
    }
    this._fileInput.fileAccept = formats;
    return this;
  }

  public useBinaryFormat(): SmzFormFileBuilder<TResponse> {
    this._fileInput.outputFormat = 'file';
    return this;
  }

  public maxSize(size: number): SmzFormFileBuilder<TResponse> {
    this._fileInput.maxFileSize = size;
    return this;
  }

  public thumbnailSize(size: string): SmzFormFileBuilder<TResponse> {
    this._fileInput.thumbnailSize = size;
    return this;
  }

  public disableZoom(): SmzFormFileBuilder<TResponse> {
    this._fileInput.allowZoom = false;
    return this;
  }

  public hideFileSize(): SmzFormFileBuilder<TResponse> {
    this._fileInput.showFileSize = false;
    return this;
  }

  public dragIconClass(className: string): SmzFormFileBuilder<TResponse> {
    this._fileInput.dragIconClass = className;
    return this;
  }

  public inputMessage(message: string): SmzFormFileBuilder<TResponse> {
    this._fileInput.inputMessage = message;
    return this;
  }

  public maxDisplayName(length: number, separator: string = '...'): SmzFormFileBuilder<TResponse> {
    this._fileInput.shortenLength = length;
    this._fileInput.shortenSeparator = separator;
    return this;
  }
}

export class SmzFormListBuilder<TResponse> extends SmzFormInputBuilder<SmzFormListBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _listInput: SmzListControl) {
    super(_groupBuilder, _listInput);

    const textInput: SmzTextControl = {
      propertyName: 'name', name: 'nome', type: SmzControlType.TEXT, hideName: true,
      validatorsPreset: { isRequired: true },
      advancedSettings: { validators: [MustBeUnique(this._listInput.options)], validationMessages: [{ type: 'unique', message: 'Já existe um item com esse dado.' }] },
      template: { large: { row: 'col-12' } },
    };

    this._listInput.crud.inputData = textInput;
  }

  public addOption(option: string): SmzFormListBuilder<TResponse> {
    this._listInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormListBuilder<TResponse> {
    this._listInput.showFilter = true;
    return this;
  }

  public allowBatchCreation(): SmzFormListBuilder<TResponse> {
    this._listInput.allowBatchCreation = true;
    return this;
  }

  public height(height: string): SmzFormListBuilder<TResponse> {
    this._listInput.height = height;
    return this;
  }

  public useDialogEditMode(): SmzFormListBuilder<TResponse> {
    this._listInput.editMode = 'dialog';
    return this;
  }

  public hideLabel(): SmzFormListBuilder<TResponse> {
    this._listInput.hideName = true;
    return this;
  }

  public confirmBeforeRemoveItem(): SmzFormListBuilder<TResponse> {
    this._listInput.askBeforeRemoveItem = true;
    return this;
  }

  public setEmptyMessage(message: string): SmzFormListBuilder<TResponse> {
    this._listInput.emptyMessage = message;
    return this;
  }

  public allowOnlyUniqueData(): SmzFormListBuilder<TResponse> {
    this._listInput.crud.validateForUniqueValues = true;
    return this;
  }

  public setLimitCount(max: number): SmzFormListBuilder<TResponse> {
    this._listInput.limitCount = max;
    return this;
  }

  public useFractionNumberInput(label: string = 'Dado', digits: number = 2): SmzFormListBuilder<TResponse> {

    const numberInput: SmzNumberControl = {
      propertyName: 'name', name: label, type: SmzControlType.NUMBER,
      template: { large: { row: 'col-12' } },
      useFraction: true,
      minFractionDigits: digits,
      maxFractionDigits: digits
    };

    this._listInput.crud.inputData = numberInput;

    return this;
  }

  public useNumberInput(label: string = 'Dado'): SmzFormListBuilder<TResponse> {

    const numberInput: SmzNumberControl = {
      propertyName: 'name', name: label, type: SmzControlType.NUMBER,
      template: { large: { row: 'col-12' } },
      useFraction: false,
    };

    this._listInput.crud.inputData = numberInput;

    return this;
  }

  public buttons(): SmzFormListButtonsBuilder<TResponse> {
    return new SmzFormListButtonsBuilder<TResponse>(this, this._listInput);
  }

  public get group(): SmzFormGroupBuilder<TResponse> {
    if (this._listInput.allowBatchCreation && this._listInput.crud?.inputData?.type === SmzControlType.NUMBER) {
      throw Error("You cannot call allowBatchCreation while using a number list input");
    }

    this._listInput.styleClass += 'smz__input_list ';

    if (!this._listInput.showAddButton && !this._listInput.showSortButton && !this._listInput.showClearButton) {
      this._listInput.styleClass += 'smz__input_list-hide-header ';
    }

    return this._groupBuilder;
  }
}

export class SmzFormListButtonsBuilder<TResponse> {
  private _allEnabled = false;
  constructor(public _listBuilder: SmzFormListBuilder<TResponse>, private _listInput: SmzListControl) {
  }

  public add(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'add' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showAddButton = true;
    this._allEnabled = null;
    return this;
  }

  public remove(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'remove' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showRemoveButton = true;
    this._allEnabled = null;
    return this;
  }

  public edit(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'edit' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showEditButton = true;
    this._allEnabled = null;
    return this;
  }

  public sort(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'sort' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showSortButton = true;
    this._allEnabled = null;
    return this;
  }

  public move(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'move' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showMoveButton = true;
    this._allEnabled = null;
    return this;
  }

  public clear(): SmzFormListButtonsBuilder<TResponse> {
    if (this._allEnabled) {
      throw Error("You cannot call 'clear' because you set all buttons to be visible in the input list control");
    }
    this._listInput.showClearButton = true;
    this._allEnabled = null;
    return this;
  }

  public all(): SmzFormListButtonsBuilder<TResponse> {

    if (this._allEnabled == null) {
      throw Error("You cannot call 'all' because you already set other button manually in the input list control");
    }

    this._allEnabled = false;

    this.add();
    this.remove();
    this.edit();
    this.sort();
    this.move();
    this.clear();

    this._allEnabled = true;

    return this;
  }

  public get list(): SmzFormListBuilder<TResponse> {
    return this._listBuilder;
  }
}

export class SmzFormMaskBuilder<TResponse> extends SmzFormInputBuilder<SmzFormMaskBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _maskInput: SmzMaskControl) {
    super(_groupBuilder, _maskInput);
  }

  public mask(mask: string): SmzFormMaskBuilder<TResponse> {
    this._maskInput.mask = mask;
    return this;
  }

  public characterPattern(pattern: string): SmzFormMaskBuilder<TResponse> {
    this._maskInput.characterPattern = pattern;
    return this;
  }

  public exportPattern(pattern: SmzTextPattern): SmzFormMaskBuilder<TResponse> {
    this._maskInput.exportPattern = pattern;
    return this;
  }

  public unmask(): SmzFormMaskBuilder<TResponse> {
    this._maskInput.unmask = true;
    return this;
  }
}

export class SmzFormPasswordBuilder<TResponse> extends SmzFormInputBuilder<SmzFormPasswordBuilder<TResponse>, TResponse> {
  protected that = this;
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _passwordInput: SmzPasswordControl) {
    super(_groupBuilder, _passwordInput);
  }

  public setFeedback(): SmzFormPasswordBuilder<TResponse> {
    this._passwordInput.feedback = true;
    return this;
  }

  public enableToggleMask(): SmzFormPasswordBuilder<TResponse> {
    this._passwordInput.toggleMask = true;
    return this;
  }

  public setStrengthRegex(medium: string, strong: string): SmzFormPasswordBuilder<TResponse> {
    this._passwordInput.mediumRegex = medium;
    this._passwordInput.strongRegex = strong;
    return this;
  }
}

export class SmzFormInputValidatorBuilder<TInput, TResponse> {
  constructor(public _inputBuilder: TInput, private _input: SmzFormsBaseControl, public _groupBuilder: SmzFormGroupBuilder<TResponse>) {
    _input.validatorsPreset = {};

    _input.advancedSettings = {
      validators: [],
      validationMessages: [],
      ..._input.advancedSettings
    };

  }

  public required(): SmzFormInputValidatorBuilder<TInput, TResponse> {
    this._input.validatorsPreset.isRequired = true;
    if(this._input.type == SmzControlType.CALENDAR) {
      (this._input as SmzCalendarControl).showButtonBar = false;
    }

    if (!this._input.name.endsWith('*')) this._input.name = `${this._input.name} *`;
    return this;
  }

  public length(min: number, max: number): SmzFormInputValidatorBuilder<TInput, TResponse> {
    this._input.validatorsPreset.minLength = min;
    this._input.validatorsPreset.maxLength = max;
    return this;
  }

  public range(min: number, max: number): SmzFormInputValidatorBuilder<TInput, TResponse> {
    this._input.validatorsPreset.min = min;
    this._input.validatorsPreset.max = max;
    return this;
  }

  public custom(validator: ValidatorFn, name?: string, message?: string): SmzFormInputValidatorBuilder<TInput, TResponse> {
    this._input.advancedSettings.validators.push(validator);

    if (name != null && message != null) {
      this._input.advancedSettings.validationMessages.push({ type: name, message });
    }

    return this;
  }

  public email(): SmzFormInputValidatorBuilder<TInput, TResponse> {
    this._input.advancedSettings.validators.push(Validators.email);
    this._input.advancedSettings.validationMessages.push({ type: 'email', message: 'Email com formato inválido.' });

    return this;
  }

  public get group(): SmzFormGroupBuilder<TResponse> {
    return this._groupBuilder;
  }

  public get input(): TInput {
    return this._inputBuilder;
  }
}

export function getSmzTemplate(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
  colType: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12') {

  switch (breakpoint) {
    case 'EXTRA_SMALL':
      return { extraSmall: { row: colType == null ? 'col-auto' : colType } };
    case 'SMALL':
      return { small: { row: colType == null ? 'col-auto' : colType } };
    case 'MEDIUM':
      return { medium: { row: colType == null ? 'col-auto' : colType } };
    case 'LARGE':
      return { large: { row: colType == null ? 'col-auto' : colType } };
    case 'EXTRA_LARGE':
      return { extraLarge: { row: colType == null ? 'col-auto' : colType } };
    default:
      return {};
  }

}
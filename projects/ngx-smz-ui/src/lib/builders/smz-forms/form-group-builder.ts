import { SmzCalendarControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzContentMaskControl, SmzControlType, SmzCurrencyControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzLinkedMultiSelectControl, SmzListControl, SmzMaskControl, SmzMultiSelectControl, SmzNumberControl, SmzPasswordControl, SmzRadioControl, SmzSwitchControl, SmzTagAreaControl, SmzTextAreaControl, SmzTextControl } from '../../modules/smz-forms/models/control-types';
import { SimpleEntity, SimpleParentEntity } from '../../common/models/simple-named-entity';
import { SmzFormBuilder } from './form-builder';
import { SmzFormGroup } from '../../modules/smz-forms/models/smz-forms';
import { SmzFormsBaseControl } from '../../modules/smz-forms/models/controls';
import { ValidatorFn, Validators } from '@angular/forms';
import { SmzTextPattern } from '../../modules/smz-forms/models/text-patterns';
import { MustMatch } from '../../common/utils/custom-validations';


export class SmzFormGroupBuilder<TResponse> {
  constructor(public _formBuilder: SmzFormBuilder<TResponse>, public group: SmzFormGroup) {
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12'): SmzFormGroupBuilder<TResponse> {
    const template = getSmzTemplate(breakpoint, colType) as any;
    this.group.template = { ...this.group.template, ...template };
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormCalendarBuilder(this, input as SmzCalendarControl);
  }

  public checkbox(property: string, label?: string, defaultValue?: boolean): SmzFormInputBuilder<TResponse> {

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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormInputBuilder(this, input as SmzCheckBoxControl);
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

    let input = this.group.children.find(x => x.propertyName == property);

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
      if (label != null || options != null || defaultValue != null) {
        throw Error('Label, options and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormDropdownBuilder<T,TResponse>(this, input as SmzDropDownControl<T>);
  }

  public linkedDropdown<T>(property: string, dependsOn: string, label?: string, options?: SimpleParentEntity<T>[], defaultValue?: T): SmzFormLinkedDropdownBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for linked dropdown.')
      }

      input = {
        propertyName: property, type: SmzControlType.LINKED_DROPDOWN, name: label, advancedSettings: { overrideResponseFormat: 'flat' },
        defaultValue: defaultValue, options: options, dependsOn: { propertyName: dependsOn, formId: this._formBuilder._state.formId }
      };

      this.group.children.push(input);
    }
    else {
      if (label != null || options != null || defaultValue != null) {
        throw Error('Label, options and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormLinkedDropdownBuilder<T,TResponse>(this, input as SmzLinkedDropDownControl<T>);
  }

  public multiselect<T>(property: string, label?: string, options?: SimpleEntity<T>[], defaultValue?: T[]): SmzFormMultiselectBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

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
      if (label != null || options != null || defaultValue != null) {
        throw Error('Label, options and defaultValue come from uiDefinitions and cannot be changed.')
      }
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

  public colorPicker(property: string, label?: string, defaultValue?: string): SmzFormInputBuilder<TResponse> {

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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormInputBuilder(this, input as SmzColorPickerControl);
  }

  public currency(property: string, label?: string, defaultValue?: string): SmzFormInputBuilder<TResponse> {

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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormInputBuilder(this, input as SmzCurrencyControl);
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormNumberBuilder(this, input as SmzNumberControl);
  }

  public radioGroup<T>(property: string, label?: string, options?: SimpleEntity<T>[], defaultValue?: T): SmzFormRadioGroupBuilder<T,TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

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
      if (label != null || options != null || defaultValue != null) {
        throw Error('Label, options and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormRadioGroupBuilder<T,TResponse>(this, input as SmzRadioControl<T>);
  }

  public switch(property: string, label?: string, defaultValue?: boolean): SmzFormInputBuilder<TResponse> {

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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormInputBuilder(this, input as SmzSwitchControl);
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormTextAreaBuilder(this, input as SmzTextAreaControl);
  }

  public contentMask(property: string, label?: string, defaultValue?: string): SmzFormContentMaskBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property) as SmzContentMaskControl;

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for contentMask')
      }

      input = {
        propertyName: property, type: SmzControlType.CONTENT_MASK, name: label,
        defaultValue: defaultValue,
        quickActions: [],
        variableId: 'input__variable',
        inputClass: 'smz-input-content-mask',
        tagClass: '',
        variableBegin: '{{',
        variableEnd: '}}',
        exportHtmlNewLine: false
      };

      this.group.children.push(input);
    }
    else {
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormTextBuilder(this, input as SmzTextControl);
  }

  public file(property: string, label?: string, defaultValue?: string): SmzFormFileBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null) {
        throw Error('Label is required for file')
      }

      input = {
        propertyName: property, type: SmzControlType.FILE, name: label,
        defaultValue: defaultValue, fileAccept: null,
        maxFileSize: null,
        thumbnailSize: '90px',
        allowZoom: true,
        dragIconClass: 'pi pi-upload green-text',
        showFileSize: true,
        shortenLength: 10,
        shortenSeparator: '...',
        outputFormat: 'base64'
      };

      this.group.children.push(input);
    }
    else {
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
    }

    return new SmzFormFileBuilder(this, input as SmzFileControl);
  }

  public list(property: string, label?: string, options?: string[], defaultValue?: string[]): SmzFormListBuilder<TResponse> {

    let input = this.group.children.find(x => x.propertyName == property);

    if (input == null) {

      if (label == null || options == null) {
        throw Error('Label and options are required for list.')
      }

      input = {
        propertyName: property,
        type: SmzControlType.LIST,
        name: label,
        defaultValue: defaultValue,
        height: '200px',
        showFilter: false,
        options: options,
        askBeforeRemoveItem: false,
        showAddButton: false,
        showRemoveButton: false,
        showEditButton: false,
        showSortButton: false,
        showMoveButton: false,
        showClearButton: false,
        editMode: 'inline',
        hideName: false
      };

      this.group.children.push(input);
    }
    else {
      if (label != null || options != null || defaultValue != null) {
        throw Error('Label, options and defaultValue come from uiDefinitions and cannot be changed.')
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
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
      if (label != null || defaultValue != null) {
        throw Error('Label and defaultValue come from uiDefinitions and cannot be changed.')
      }
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

export class SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _input: SmzFormsBaseControl) {
    if (this._input.validatorsPreset == null) {
      this._input.validatorsPreset = { isRequired: false, max: null, maxLength: null, min: null, minLength: null };
    }
  }

  public setLayout(breakpoint: 'EXTRA_SMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE',
    colType?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12'): SmzFormInputBuilder<TResponse> {
    const template = getSmzTemplate(breakpoint, colType) as any;
    this._input.template = { ...this._input.template, ...template };
    return this;
  }

  public hide(condition?: boolean): SmzFormInputBuilder<TResponse> {
    this._input.isVisible = condition ?? false;
    return this;
  }

  public disable(condition?: boolean): SmzFormInputBuilder<TResponse> {
    this._input.isDisabled = condition ?? true;
    return this
  }

  public excludeFromResponse(): SmzFormInputBuilder<TResponse> {
    this._input.advancedSettings.excludeFromResponse = true;
    return this;
  }

  public overrideResponseFormat(format: 'flat' | 'object'): SmzFormInputBuilder<TResponse> {
    this._input.advancedSettings.overrideResponseFormat = format;
    return this;
  }

  public validators(): SmzFormInputValidatorBuilder<TResponse> {
    return new SmzFormInputValidatorBuilder(this, this._input);
  }

  public placeAt(position: 'after' | 'before', propertyName: string): SmzFormInputBuilder<TResponse> {

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

    return this;
  }

  public get group(): SmzFormGroupBuilder<TResponse> {
    return this._groupBuilder;
  }
}

export class SmzFormCalendarBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _calendarInput: SmzCalendarControl) {
    super(_groupBuilder, _calendarInput);
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

  public setTimeOnly(): SmzFormCalendarBuilder<TResponse> {
    this._calendarInput.timeOnly = true;
    return this;
  }
}

export class SmzFormCheckboxGroupBuilder<T,TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _checkboxGroupInput: SmzCheckBoxGroupControl<T>) {
    super(_groupBuilder, _checkboxGroupInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormCheckboxGroupBuilder<T,TResponse> {
    this._checkboxGroupInput.options.push(option);
    return this;
  }
}

export class SmzFormDropdownBuilder<T, TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _dropdownInput: SmzDropDownControl<T>) {
    super(_groupBuilder, _dropdownInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormDropdownBuilder<T,TResponse> {
    this._dropdownInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormDropdownBuilder<T,TResponse> {
    this._dropdownInput.showFilter = true;
    return this;
  }
}

export class SmzFormLinkedDropdownBuilder<T,TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _linkedDropdownInput: SmzLinkedDropDownControl<T>) {
    super(_groupBuilder, _linkedDropdownInput);
  }

  public addOption(option: SimpleParentEntity<T>): SmzFormLinkedDropdownBuilder<T,TResponse> {
    this._linkedDropdownInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormLinkedDropdownBuilder<T,TResponse> {
    this._linkedDropdownInput.showFilter = true;
    return this;
  }

}

export class SmzFormLinkedMultiselectBuilder<T,TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _linkedMultiselectInput: SmzLinkedMultiSelectControl<T>) {
    super(_groupBuilder, _linkedMultiselectInput);
  }

  public addOption(option: SimpleParentEntity<T>): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    this._linkedMultiselectInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormLinkedMultiselectBuilder<T,TResponse> {
    this._linkedMultiselectInput.showFilter = true;
    return this;
  }

}

export class SmzFormMultiselectBuilder<T,TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _multiselectInput: SmzMultiSelectControl<T>) {
    super(_groupBuilder, _multiselectInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormMultiselectBuilder<T,TResponse> {
    this._multiselectInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormMultiselectBuilder<T,TResponse> {
    this._multiselectInput.showFilter = true;
    return this;
  }
}

export class SmzFormRadioGroupBuilder<T,TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _radioGroupInput: SmzRadioControl<T>) {
    super(_groupBuilder, _radioGroupInput);
  }

  public addOption(option: SimpleEntity<T>): SmzFormRadioGroupBuilder<T,TResponse> {
    this._radioGroupInput.options.push(option);
    return this;
  }
}

export class SmzFormTagAreaBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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

export class SmzFormNumberBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _numberInput: SmzNumberControl) {
    super(_groupBuilder, _numberInput);
  }

  public setFraction(minFractionDigits: number): SmzFormNumberBuilder<TResponse> {
    this._numberInput.minFractionDigits = minFractionDigits;
    this._numberInput.useFraction = true;
    return this;
  }

  public setLocale(locale: 'pt-BR'): SmzFormNumberBuilder<TResponse> {
    this._numberInput.locale = 'pt-BR';
    this._numberInput.useFraction = true;
    return this;
  }

}

export class SmzFormTextAreaBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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

export class SmzFormContentMaskBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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


export class SmzFormTextBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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
}

export class SmzFormFileBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _fileInput: SmzFileControl) {
    super(_groupBuilder, _fileInput);
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
      this._fileInput.fileAccept = 'application/xlsx';
    }
    else {
      this._fileInput.fileAccept += ',application/xlsx'
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

export class SmzFormListBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
  constructor(public _groupBuilder: SmzFormGroupBuilder<TResponse>, private _listInput: SmzListControl) {
    super(_groupBuilder, _listInput);
  }

  public addOption(option: string): SmzFormListBuilder<TResponse> {
    this._listInput.options.push(option);
    return this;
  }

  public showFilter(): SmzFormListBuilder<TResponse> {
    this._listInput.showFilter = true;
    return this;
  }

  public height(height: string): SmzFormListBuilder<TResponse> {
    this._listInput.height = height;
    return this;
  }

  public setDialogEditMode(): SmzFormListBuilder<TResponse> {
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

  public buttons(): SmzFormListButtonsBuilder<TResponse> {
    return new SmzFormListButtonsBuilder<TResponse>(this, this._listInput);
  }
}

export class SmzFormListButtonsBuilder<TResponse> {
  constructor(public _listBuilder: SmzFormListBuilder<TResponse>, private _listInput: SmzListControl) {
  }

  public add(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showAddButton = true;
    return this;
  }

  public remove(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showRemoveButton = true;
    return this;
  }

  public edit(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showEditButton = true;
    return this;
  }

  public sort(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showSortButton = true;
    return this;
  }

  public move(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showMoveButton = true;
    return this;
  }

  public clear(): SmzFormListButtonsBuilder<TResponse> {
    this._listInput.showClearButton = true;
    return this;
  }

  public all(): SmzFormListButtonsBuilder<TResponse> {
    this.add();
    this.remove();
    this.edit();
    this.sort();
    this.move();
    this.clear();
    return this;
  }

  public get list(): SmzFormListBuilder<TResponse> {
    return this._listBuilder;
  }
}

export class SmzFormMaskBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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

export class SmzFormPasswordBuilder<TResponse> extends SmzFormInputBuilder<TResponse> {
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

export class SmzFormInputValidatorBuilder<TResponse> {
  constructor(public _inputBuilder: SmzFormInputBuilder<TResponse>, private _input: SmzFormsBaseControl) {
    _input.validatorsPreset = {};

    _input.advancedSettings = {
      validators: [],
      validationMessages: [],
      ..._input.advancedSettings
    };

  }

  public required(): SmzFormInputValidatorBuilder<TResponse> {
    this._input.validatorsPreset.isRequired = true;
    if(this._input.type == SmzControlType.CALENDAR) {
      (this._input as SmzCalendarControl).showButtonBar = false;
    }

    if (!this._input.name.endsWith('*')) this._input.name = `${this._input.name} *`;
    return this;
  }

  public length(min: number, max: number): SmzFormInputValidatorBuilder<TResponse> {
    this._input.validatorsPreset.minLength = min;
    this._input.validatorsPreset.maxLength = max;
    return this;
  }

  public range(min: number, max: number): SmzFormInputValidatorBuilder<TResponse> {
    this._input.validatorsPreset.min = min;
    this._input.validatorsPreset.max = max;
    return this;
  }

  public custom(validator: ValidatorFn, name?: string, message?: string): SmzFormInputValidatorBuilder<TResponse> {
    this._input.advancedSettings.validators.push(validator);

    if (name != null && message != null) {
      this._input.advancedSettings.validationMessages.push({ type: name, message });
    }

    return this;
  }

  public email(): SmzFormInputValidatorBuilder<TResponse> {
    this._input.advancedSettings.validators.push(Validators.email);
    this._input.advancedSettings.validationMessages.push({ type: 'email', message: 'Email com formato inválido.' });

    return this;
  }

  public get group(): SmzFormGroupBuilder<TResponse> {
    return this._inputBuilder._groupBuilder;
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
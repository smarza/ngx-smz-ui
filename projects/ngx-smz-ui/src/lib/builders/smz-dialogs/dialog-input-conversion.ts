import { fixDate, isEmpty } from '../common/utils';
import { Store } from '@ngxs/store';
import { SmzDialogFeature } from '../../modules/smz-dialogs/models/smz-dialogs';
import { SmzForm, SmzFormGroup } from '../../modules/smz-forms/models/smz-forms';
import { SmzCalendarControl, SmzCheckBoxControl, SmzColorPickerControl, SmzControlType, SmzControlTypes, SmzCurrencyControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzListControl, SmzMaskControl, SmzMultiSelectControl, SmzNumberControl, SmzPasswordControl, SmzRadioControl, SmzSwitchControl, SmzTextAreaControl, SmzTextControl } from '../../modules/smz-forms/models/control-types';
import { SimpleNamedEntity } from '../../common/models/simple-named-entity';
import { SmzFormsBaseControl } from '../../modules/smz-forms/models/controls';
import { SmzTemplate } from '../../common/models/templates';
import { cloneDeep } from 'lodash-es';
import { GlobalInjector } from '../../common/services/global-injector';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';

export function convertFormCreationFeature(
  entityName: string,
  store: Store,
  entity: { [key: string]: any } = null,
  options: InputConversionOptions = null
): SmzDialogFeature {

  const state = store.selectSnapshot(x => x.database['uiDefinitions']);
  const groups = cloneDeep(state.data[entityName].create);

  if (groups == null) throw new Error('UI definitions are empty. Were they manually loaded or set as required state?');

  return convertFormFeatureFromInputData(groups, entity, options, store);
}

export function convertFormUpdateFeature(
  entityName: string,
  store: Store,
  entity: { [key: string]: any } = null,
  options: InputConversionOptions = null
): SmzDialogFeature {

  const state = store.selectSnapshot(x => x.database['uiDefinitions']);
  const groups = cloneDeep(state.data[entityName].update);

  if (groups == null) throw new Error('UI definitions are empty. Were they manually loaded or set as required state?');

  return convertFormFeatureFromInputData(groups, entity, options, store);
}

export function convertFormFeature(
  entityName: string,
  store: Store,
  entity: { [key: string]: any } = null,
  options: InputConversionOptions = null
): SmzDialogFeature {

  const state = store.selectSnapshot(x => x.database['uiDefinitions']);
  const groups = entity != null ? cloneDeep(state.data[entityName].update) : cloneDeep(state.data[entityName].create);

  if (groups == null) throw new Error('UI definitions are empty. Were they manually loaded or set as required state?');

  return convertFormFeatureFromInputData(groups, entity, options, store);
}

export function convertFormFeatureFromInputData(
  groups: any[],
  entity: { [key: string]: any } = null,
  options: InputConversionOptions = null,
  store: Store,
): SmzDialogFeature {

  const rbkConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);

  const form: SmzForm<any> = {
    groups: [],
    behaviors: {}
  };

  const smzFeature: SmzDialogFeature = {
    type: 'form',
    data: form
  };

  // Reorder fileds if the options are available
  if (options != null && options.fieldsToOverwriteOrder) {
    const controls = [];

    let groupIndex = 0;
    if (groups.length === 1) {
      groupIndex = 0;
    }
    else if (groups.length > 1 && groups[0].controls.length === 1 && groups[0].controls[0].propertyName === 'id') {
      groupIndex = 1;
    }
    else {
      throw new Error(`Multiple groups are not supported with the reorder option`);
    }

    for (let i = 0; i < options.fieldsToOverwriteOrder.length; i++) {
      const item = groups[groupIndex].controls.find(x => x.propertyName === options.fieldsToOverwriteOrder[i]);
      if (item == null) {
        throw new Error(`Could not find control '${options.fieldsToOverwriteOrder[i]}' for reorder`);
      }
      controls.push(item);
    }
    groups[groupIndex].controls = controls;
  }

  for (const groupConfig of groups) {
    const group: SmzFormGroup = {
      name: groupConfig.controls[0].group,
      showName: !isEmpty(groupConfig.controls[0].group),
      children: convertInputs(groupConfig.controls, store, options)
    };

    if (options != null) {
      if (options.fieldsToIgnore != null) {
        for (const input of options.fieldsToIgnore) {
          group.children = group.children.filter(x => x.propertyName !== input);
        }
      }

      if (options.fieldsToConvert != null) {
        for (const tuple of options.fieldsToConvert) {
          const index = group.children.findIndex(x => x.propertyName === tuple.originalName);
          if (index !== -1) {
            group.children[index] = { ...group.children[index], propertyName: tuple.newName }
          }
        }
      }
    }

    if (entity != null) {
      for (const input of group.children) {
        if (input.propertyName.endsWith('Id') && entity[input.propertyName.substring(0, input.propertyName.length - 2)]?.id !== undefined) {
          input.defaultValue = entity[input.propertyName.substring(0, input.propertyName.length - 2)].id;
        }
        else
        {
          let propertyName = input.propertyName;
          // Check if the name wasn't replaced
          if (options != null && options.fieldsToConvert != null) {
            const replaceIndex = options.fieldsToConvert.findIndex(x => x.newName === input.propertyName);
            if (replaceIndex !== -1) {
              propertyName = options.fieldsToConvert[replaceIndex].originalName;
            }
          }

          if (entity[propertyName] !== undefined) {

            // LinkedDropdown is supported only in this else scenario
            if (input.type === SmzControlType.LINKED_DROPDOWN && (input as any).dependsOn != null)
            {
              const dependsOn = (input as any).dependsOn.propertyName;

              const parent = group.children.find(x => x.propertyName === dependsOn);
              parent.defaultValue = entity[dependsOn]?.id !== undefined ? entity[dependsOn].id : entity[dependsOn];
            }

            input.defaultValue = entity[propertyName]?.id !== undefined ? entity[propertyName].id : entity[propertyName];
          }
        }
      }
    }

    form.groups.push(group);
  }

  // Apply templates if the options are available
  if (options != null && options.fieldsWithLayoutTemplates) {
    let groupIndex = 0;
    if (groups.length === 1) {
      groupIndex = 0;
    }
    else if (groups.length > 1 && groups[0].controls.length === 1 && groups[0].controls[0].propertyName === 'id') {
      groupIndex = 1;
    }
    else {
      throw new Error(`Multiple groups are not supported with the reorder option`);
    }

    for (let i = 0; i < options.fieldsWithLayoutTemplates.length; i++) {
      const item = form.groups[groupIndex].children.find(x => x.propertyName === options.fieldsWithLayoutTemplates[i].propertyName);
      if (item == null) {
        throw new Error(`Could not find control '${options.fieldsWithLayoutTemplates[i].propertyName}' for templating`);
      }
      item.template = options.fieldsWithLayoutTemplates[i].template;
    }
  }

    // Apply templates if the options are available
    if (options != null && options.fieldsToOverwriteControl) {
      let groupIndex = 0;
      if (groups.length === 1) {
        groupIndex = 0;
      }
      else if (groups.length > 1 && groups[0].controls.length === 1 && groups[0].controls[0].propertyName === 'id') {
        groupIndex = 1;
      }
      else {
        throw new Error(`Multiple groups are not supported with the reorder option`);
      }

      for (let i = 0; i < options.fieldsToOverwriteControl.length; i++) {
        const item = form.groups[groupIndex].children.find(x => x.propertyName === options.fieldsToOverwriteControl[i].propertyName);
        if (item == null) {
          throw new Error(`Could not find control '${options.fieldsToOverwriteControl[i].propertyName}' for templating`);
        }
        options.fieldsToOverwriteControl[i].callback(item);
      }
    }

  return smzFeature;
}

function convertInputs(inputs: InputConfig[], store: Store, options: InputConversionOptions): SmzControlTypes[] {
  const rbkConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  const results = [];

  if (inputs == null) throw new Error('Inputs could not be null');

  for (const config of inputs) {

    if (rbkConfig.debugMode) {
      console.groupCollapsed(config.propertyName);

      console.log('config', config);
      console.log('options', options);
    }

    if (config.controlType.id === `${SmzControlType.TEXT}`) {
      const input: SmzTextControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.TEXT,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.CALENDAR}`) {
      const input: SmzCalendarControl = {
        ...convertBaseControl(config),
        defaultValue: fixDate(config.defaultValue),
        type: SmzControlType.CALENDAR,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.CHECKBOX}`) {
      const input: SmzCheckBoxControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.CHECKBOX,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.COLOR_PICKER}`) {
      const input: SmzColorPickerControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.COLOR_PICKER,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.CURRENCY}`) {
      const input: SmzCurrencyControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.CURRENCY,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.DROPDOWN}`) {

      const list = getInputOptions(config, store, options);

      if (rbkConfig.debugMode) {
        console.log('list', list);
      }

      const input: SmzDropDownControl<any> = {
        ...convertBaseControl(config),
        defaultValue: config.required ? (list?.length > 0 ? list[0].id : null) : config.defaultValue,
        type: SmzControlType.DROPDOWN,
        filterMatchMode: config.filterMatchMode,
        showFilter: config.showFilter,
        options: list,
        showClear: config.required ? false : true
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.FILE}`) {
      const input: SmzFileControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.FILE,
        fileAccept: config.fileAccept
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.MULTI_SELECT}`) {
      const input: SmzMultiSelectControl<any> = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.MULTI_SELECT,
        defaultLabel: '',
        filterMatchMode: config.filterMatchMode,
        showFilter: config.showFilter,
        options: getInputOptions(config, store, options),
        showClear: config.required ? false : true
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.NUMBER}`) {
      const input: SmzNumberControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.NUMBER,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.DECIMAL}`) {
      const input: SmzNumberControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.NUMBER,
        useFraction: true,
        minFractionDigits: 0,
        maxFractionDigits: 10
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.PASSWORD}`) {
      const input: SmzPasswordControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.PASSWORD,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.RADIO}`) {
      const input: SmzRadioControl<any> = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.RADIO,
        options: getInputOptions(config, store, options)
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.SWITCH}`) {
      const input: SmzSwitchControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.SWITCH,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.TEXT_AREA}`) {
      const input: SmzTextAreaControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.TEXT_AREA,
        textAreaRows: config.textAreaRows
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.TEXT_MASK}`) {
      const input: SmzMaskControl = {
        ...convertBaseControl(config),
        defaultValue: config.defaultValue,
        type: SmzControlType.TEXT_MASK,
        characterPattern: config.characterPattern,
        mask: config.mask,
        unmask: config.unmask,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.LIST}`) {
      const input: SmzListControl = {
        ...convertBaseControl(config),
        defaultValue: [],
        type: SmzControlType.LIST,
        askBeforeRemoveItem: false,
        editMode: 'inline',
        showAddButton: true,
        allowBatchCreation: false,
        showClearButton: true,
        showFilter: false,
        showEditButton: true,
        showMoveButton: true,
        showRemoveButton: true,
        showSortButton: false,
      };
      results.push(input);
    }

    else if (config.controlType.id === `${SmzControlType.LINKED_DROPDOWN}`) {
      const data = getLinkedDropdownOptions(config, store, options);
      const childConfig: InputConfig = config;
      const parentConfig: InputConfig = { ...config, name: childConfig.linkedDisplayName, propertyName: childConfig.linkedPropertyName };

      const parentInput: SmzDropDownControl<any> = {
        ...convertBaseParentControl(parentConfig, childConfig),
        defaultValue: config.required ? data.parentData[0].id : null,
        type: SmzControlType.DROPDOWN,
        filterMatchMode: config.filterMatchMode,
        showFilter: config.showFilter,
        options: data.parentData,
        showClear: config.required ? false : true
      };

      const childInput: SmzLinkedDropDownControl<any> = {
        ...convertBaseControl(childConfig),
        defaultValue: config.required ? data.childrenData.find(x => x.parentId === data.parentData[0].id).data[0].id : null,
        type: SmzControlType.LINKED_DROPDOWN,
        filterMatchMode: config.filterMatchMode,
        showFilter: config.showFilter,
        dependsOn: { propertyName: childConfig.linkedPropertyName },
        options: data.childrenData,
        showClear: config.required ? false : true
      };

      results.push(parentInput);
      results.push(childInput);
    }

    if (rbkConfig.debugMode) {
      console.log('results', results[results?.length - 1]);
      console.groupEnd();
    }

  }

  return results;
}

function getInputOptions(config: InputConfig, store: Store, options: InputConversionOptions): any[] {
  if (config.data != null) {
    return config.data;
  }

  if (config.dataSource.id !== '1') {
    throw new Error('Unsuported data source type');
  }

  let stateData = getDataFromStore(config, store, options);

  if (!isEmpty(config.entityLabelPropertyName)) {
    return stateData.map(x => ({ id: x.id, name: x[config.entityLabelPropertyName] }));
  }
  else {
    return stateData;
  }
}

function getLinkedDropdownOptions(config: InputConfig, store: Store, options: InputConversionOptions): { parentData: any[], childrenData: any[] } {
  if (config.dataSource.id !== '1') {
    throw new Error('Unsuported data source type');
  }

  let storeData = getDataFromStore(config, store, options);

  const parentData: SimpleNamedEntity[] = [];
  const childrenData: { parentId: string, data: SimpleNamedEntity[] }[] = [];

  // Prepare the data for linked dropdowns
  for (const item of storeData) {
    if (item == null) {
      throw new Error('One of the items in the array is null');
    }

    if (item['children'] == null || item['children'].length === 0) {
      throw new Error('For Linked Dropdowns the data from the store must have a children property that is not null or empty');
    }

    parentData.push({ id: item.id, name: item.name });

    for (const child of item['children']) {
      childrenData.push({ parentId: item.id, data: item['children'].map(x => ({ id: x.id, name: x.name })) });
    }
  }

  return { childrenData: childrenData, parentData: parentData };
}

function getDataFromStore(config: InputConfig, store: Store, options: InputConversionOptions) {
  let storeData = null;
  if (options != null && options.fieldsToUseSelectors != null && options.fieldsToUseSelectors.find(x => x.propertyName === config.propertyName) != null) {
    const selectorData = options.fieldsToUseSelectors.find(x => x.propertyName === config.propertyName);

    storeData = store.selectSnapshot(selectorData.selector);
  }
  else if (!isEmpty(config.sourceName)) {
    storeData = store.selectSnapshot(x => x.database[config.sourceName]?.items);
  }
  else {
    throw new Error(`The field ${config.propertyName} data is set to come from a store, but the store name wasn't specified. Either specify it in the backend or specify a selector in the conversion options`);
  }

  if (storeData === undefined) {
    throw new Error('Could not read data from the database state');
  }

  if (storeData === null) {
    throw new Error('The data was loaded from the store, but it seems to be null. Please check that your store is populated or that your selector is not returning null');
  }

  const rbkConfig = GlobalInjector.instance.get(NgxRbkUtilsConfig);
  if (rbkConfig.debugMode) {
    console.log(' >> getDataFromStore()');
    console.log('     >> config', storeData);
    console.log('     >> options', options);
    console.log('     >> storeData', storeData);
  }

  return storeData;
}

function convertBaseControl(config: InputConfig): SmzFormsBaseControl {
  return {
    name: config.required ? config.name + ' *' : config.name,
    propertyName: config.propertyName,
    isVisible: config.isVisible,
    advancedSettings: {
      excludeFromResponse: config.excludeFromResponse,
    },
    type: SmzControlType.TEXT_AREA,
    validatorsPreset: {
      isRequired: config.required,
      minLength: config.minLength,
      maxLength: config.maxLength,
    },
  };
}

function convertBaseParentControl(parentConfig: InputConfig, childConfig: InputConfig): SmzFormsBaseControl {
  return {
    name: childConfig.required ? parentConfig.name + ' *' : parentConfig.name,
    propertyName: parentConfig.propertyName,
    isVisible: childConfig.isVisible,
    advancedSettings: {
      excludeFromResponse: childConfig.excludeFromResponse,
    },
    validatorsPreset: {
      isRequired: childConfig.required,
    },
  };
}

export interface FormDefinitionData {
  create: FormGroupConfig[],
  update: FormGroupConfig[],
}

export interface FormGroupConfig {
  controls: InputConfig[];
}

export interface InputConfig {
  controlType: SimpleNamedEntity;
  dataSource?: SimpleNamedEntity;
  propertyName: string;
  sourceName?: string;
  name: string;
  defaultValue?: any;
  group?: string;

  dependsOn?: string;

  textAreaRows?: number;

  mask?: string;
  unmask?: boolean;
  characterPattern?: string;

  fileAccept?: string;

  showFilter?: boolean;
  filterMatchMode?: string;

  required: boolean;
  minLength?: number;
  maxLength?: number;
  data?: SimpleNamedEntity[];
  isVisible: boolean;
  excludeFromResponse?: boolean;

  entityLabelPropertyName?: string;

  linkedPropertyName?: string;
  linkedDisplayName?: string;
}

export interface InputConversionOptions {
  fieldsToIgnore?: string[],
  fieldsToConvert?: { originalName: string, newName: string }[]
  fieldsToUseSelectors?: { propertyName: string, selector: any }[]
  fieldsToOverwriteOrder?: string[],
  fieldsWithLayoutTemplates?: { propertyName: string, template: SmzTemplate }[]
  fieldsToOverwriteControl?: { propertyName: string, callback: (control: SmzControlTypes) => void }[]
}
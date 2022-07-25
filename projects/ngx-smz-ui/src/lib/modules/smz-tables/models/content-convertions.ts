import { InputConfig } from '../../../builders/smz-dialogs/dialog-input-conversion';
import { SmzControlType, SmzControlTypes, SmzDropDownControl } from '../../smz-forms/models/control-types';
import { SmzFormsValidatorsPreset } from '../../smz-forms/models/controls';
import { SmzContentType, SmzContentTypes, SmzExportableContentSource, SmzExportableContentType } from './content-types';
import { SmzDropdownEditable, SmzEditableType, SmzEditableTypes } from './editable-types';
import { SmzFilterType } from './filter-types';

interface ContentConvertionData {
  controlType: SmzControlType;
  field: (input: InputConfig) => string;
  property: (input: InputConfig) => string;
  content: (input: InputConfig) => {
    type: SmzContentType;
    styleClass: string;
    data?: SmzContentTypes;
    ngStyle: { [style: string]: any } | null;
    exportAs: SmzExportableContentType;
    exportSource: SmzExportableContentSource;
  };
  editable: (input: SmzControlTypes) => {
    property: string;
    type: SmzEditableType;
    data?: SmzEditableTypes;
    validatorsPreset: SmzFormsValidatorsPreset;
    defaultCreationValue: any;
  },
  isOrderable: boolean;
  isGlobalFilterable: boolean;
  filterType: SmzFilterType;
}

export const ContentConvertions: ContentConvertionData[] = [
  {
    controlType: SmzControlType.TEXT,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.TEXT,
    content: () => ({ type: SmzContentType.TEXT, styleClass: '', data: null, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.TEXT,
        data: null,
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: ''
      }),
  },
  {
    controlType: SmzControlType.DROPDOWN,
    field: (input: InputConfig) => `${input.propertyName}.name`,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: false,
    isGlobalFilterable: true,
    filterType: SmzFilterType.MULTI_SELECT,
    content: () => ({ type: SmzContentType.TEXT, styleClass: '', data: null, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzDropDownControl<never>) => (
      {
        property: input.propertyName,
        type: SmzEditableType.DROPDOWN,
        data: { sourceType: 'object', sourceData: input.options, placeholder: 'Selecione uma opção' } as SmzDropdownEditable,
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: null
      }),
  },
  {
    controlType: SmzControlType.TEXT_AREA,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.TEXT,
    content: () => ({ type: SmzContentType.TEXT, styleClass: '', data: null, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.AREA,
        data: { rows: 3 },
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: ''
      }),
  },
  {
    controlType: SmzControlType.CALENDAR,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.DATE,
    content: () => ({ type: SmzContentType.CALENDAR, styleClass: '', data: { format: 'shortDate' }, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.CALENDAR,
        data: null,
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: new Date(),
      }),
  },
  {
    controlType: SmzControlType.CHECKBOX,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.BOOLEAN,
    content: () => ({ type: SmzContentType.ICON, styleClass: '', data: {
      matches: [
        { icon: 'fa-solid fa-toggle-on', class: 'text-green-500', value: true },
        { icon: 'fa-solid fa-toggle-off', class: 'text-gray-300', value: false }
      ]
    }, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.SWITCH,
        data: null,
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: false
      }),
  },
  {
    controlType: SmzControlType.SWITCH,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.BOOLEAN,
    content: () => ({ type: SmzContentType.ICON, styleClass: '', data: {
      matches: [
        { icon: 'fa-solid fa-toggle-on', class: 'text-green-500', value: true },
        { icon: 'fa-solid fa-toggle-off', class: 'text-gray-300', value: false }
      ]
    }, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.SWITCH,
        data: null,
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: false
      }),
  },
  {
    controlType: SmzControlType.NUMBER,
    field: (input: InputConfig) => input.propertyName,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: true,
    isGlobalFilterable: true,
    filterType: SmzFilterType.NUMERIC,
    content: () => ({ type: SmzContentType.TEXT, styleClass: '', data: null, ngStyle: {}, exportAs: null, exportSource: SmzExportableContentSource.DATA }),
    editable: (input: SmzControlTypes) => (
      {
        property: input.propertyName,
        type: SmzEditableType.NUMBER,
        data: {
          mode: 'decimal',
          minFractionDigits: 2,
          maxFractionDigits: 2
        },
        validatorsPreset: input.validatorsPreset,
        defaultCreationValue: 0
      }),
  },
];
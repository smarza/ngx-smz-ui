import { InputConfig } from 'ngx-rbk-utils';
import { SmzControlType, SmzControlTypes, SmzDropDownControl } from 'ngx-smz-dialogs';
import { SmzContentType, SmzContentTypes } from './content-types';
import { SmzDropdownEditable, SmzEditableType, SmzEditableTypes } from './editable-types';
import { SmzFilterType } from './filter-types';

interface ContentConvertionData {
  controlType: SmzControlType;
  field: (input: InputConfig) => string;
  property: (input: InputConfig) => string;
  content: (input: InputConfig) => {
    type: SmzContentType;
    data?: SmzContentTypes;
  };
  editable: (input: SmzControlTypes) => {
    property: string;
    type: SmzEditableType;
    data?: SmzEditableTypes;
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
    content: () => ({ type: SmzContentType.TEXT, data: null }),
    editable: (input: InputConfig) => ({ property: input.propertyName, type: SmzEditableType.TEXT, data: null }),
  },
  {
    controlType: SmzControlType.DROPDOWN,
    field: (input: InputConfig) => `${input.propertyName}.name`,
    property: (input: InputConfig) => input.propertyName,
    isOrderable: false,
    isGlobalFilterable: true,
    filterType: SmzFilterType.MULTI_SELECT,
    content: () => ({ type: SmzContentType.TEXT, data: null }),
    editable: (input: SmzDropDownControl<never>) => ({ property: input.propertyName, type: SmzEditableType.DROPDOWN, data: { sourceType: 'object', sourceData: input.options, placeholder: 'Selecione uma opção' } as SmzDropdownEditable }),
  }
];
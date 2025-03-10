import { ParentEntity, SimpleEntity, SimpleParentEntity } from '../../../common/models/simple-named-entity';
import { SmzSmartTagConfig } from '../directives/smart-tag.directive';
import { SmzFormsBaseControl } from './controls';
import { SmzTextPattern } from './text-patterns';
import { SmzQuickAction } from '../directives/transfer-value-acessor';
import { SmzFormsResponse } from './smz-forms';
import { SmzFormViewdata } from './form-viewdata';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { SmzTreeSourceTransform } from '../../smz-trees/models/tree-state';
import { AbstractControl } from '@angular/forms';
import { SmzTreeNode } from '../../smz-trees/models/tree-node';
import { SmzSmartAutocompleteTagConfig } from '../directives/smart-autocomplete-tag.directive';

export type SmzControlTypes =
    SmzCalendarControl |
    SmzCheckBoxControl |
    SmzCheckBoxGroupControl<any> |
    SmzColorPickerControl |
    SmzCurrencyControl |
    SmzDropDownControl<any> |
    SmzFileControl |
    SmzLinkedDropDownControl<any> |
    SmzLinkedMultiSelectControl<any> |
    SmzListControl |
    SmzMaskControl |
    SmzContentMaskControl |
    SmzMultiSelectControl<any> |
    SmzNumberControl |
    SmzPasswordControl |
    SmzRadioControl<any> |
    SmzSwitchControl |
    SmzTextAreaControl |
    SmzTagAreaControl |
    SmzAutocompleteTagAreaControl |
    SmzTextControl |
    SmzTextButtonControl |
    SmzTreeControl<any>
    ;

export type SmzLinkedControlTypes =
    SmzDropDownControl<any> |
    SmzLinkedDropDownControl<any> |
    SmzLinkedMultiSelectControl<any>;

export enum SmzControlType
{
    CALENDAR = 16,
    CHECKBOX = 1,
    CHECKBOX_GROUP = 2,
    COLOR_PICKER = 3,
    CURRENCY = 4,
    DROPDOWN = 5,
    FILE = 6,
    MULTI_SELECT = 7,
    NUMBER = 8,
    PASSWORD = 9,
    RADIO = 10,
    SWITCH = 11,
    TEXT = 12,
    TEXT_AREA = 13,
    TEXT_MASK = 14,
    LINKED_DROPDOWN = 15,
    LINKED_MULTISELECT = 17,
    LIST = 18,
    TAG_AREA = 19,
    CONTENT_MASK = 20,
    TEXT_BUTTON = 21,
    DECIMAL = 22, // APENAS PARA API (UI DEFINITION)
    TREE = 23,
    AUTOCOMPLETE_TAG_AREA = 24
}

export interface SmzTextControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    exportPattern?: SmzTextPattern;
    hideName?: boolean;
    autoFocus?: boolean;
}

export interface SmzTextButtonControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    hideName?: boolean;
    placeholder: string;
    label?: string;
    icon?: string;
    styleClass: string;
    // Callback has to return if the button clicked turned the input valid or invalid.
    // Everytime the button is clicked, the input is automatically invalidated.
    callback: (data: SmzFormsResponse<unknown>, utils: SmzFormViewdata) => Observable<{ isValid: boolean, messages?: string[] }>;
    isButtonValid: boolean;
    buttonMessages: string[];

}
export interface SmzListControl extends SmzFormsBaseControl
{
    defaultValue?: string[];
    height?: string;
    showFilter?: boolean;
    options?: string[];
    listBoxOptions?: SimpleEntity<any>[];
    askBeforeRemoveItem?: boolean;
    showAddButton?: boolean;
    showRemoveButton?: boolean;
    showEditButton?: boolean;
    showSortButton?: boolean;
    showMoveButton?: boolean;
    showClearButton?: boolean;
    editMode?: 'dialog' | 'inline';
    hideName?: boolean;
    emptyMessage?: string;
    allowBatchCreation?: boolean;
    crud?: {
        inputType: 'string' | 'float';
        inputData: Partial<SmzTextControl> | Partial<SmzNumberControl>;
        digitsInfo: string;
        validateForUniqueValues: boolean;
        insertAtBeginning: boolean;
        labelLocale: 'pt';
        inputLocale: 'pt-BR';
    }
    limitCount?: number;
    styleClass?: string;
}

export interface SmzCurrencyControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzCalendarControl extends SmzFormsBaseControl
{
    defaultValue?: Date;
    touchUI?: boolean;
    focusTrap?: boolean;
    keepInvalid?: boolean;
    showButtonBar?: boolean;
    showOnFocus?: boolean;
    showIcon?: boolean;
    dateFormat?: string;
    yearRange?: string;
    timeOnly?: boolean;
    showTime?: boolean;

}

export interface SmzPasswordControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    feedback?: boolean;
    toggleMask?: boolean;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    mediumRegex?: string;
    strongRegex?: string;
}

export interface SmzSwitchControl extends SmzFormsBaseControl
{
    defaultValue?: boolean;

}

export interface SmzNumberControl extends SmzFormsBaseControl
{
    defaultValue?: number;
    useFraction?: boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    useGrouping?: boolean;
    locale?: 'pt-BR';
    autoFocus?: boolean;

}

export interface SmzTextAreaControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    textAreaRows?: number;
    exportPattern?: SmzTextPattern;

}

export interface SmzTagAreaControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    textAreaRows?: number;
    exportPattern?: SmzTextPattern;
    config: SmzSmartTagConfig;

}

export interface SmzAutocompleteTagAreaControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    textAreaRows?: number;
    exportPattern?: SmzTextPattern;
    config: SmzSmartAutocompleteTagConfig;
    allowCustomValues: boolean;
}

export interface SmzColorPickerControl extends SmzFormsBaseControl
{
    defaultValue?: string;
}

export interface SmzMaskControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    mask?: string;
    unmask?: boolean;
    characterPattern?: string;
    exportPattern?: SmzTextPattern;
}

export interface SmzContentMaskControl extends SmzFormsBaseControl
{
    _originalVariables?: string[];
    defaultValue?: string;
    textAreaRows?: number;
    quickActions?: SmzQuickAction[];
    variableId?: string;
    inputClass?: string;
    tagClass?: string
    variableBegin?: string;
    variableEnd?: string;
    exportHtmlNewLine?: boolean;
}

export interface SmzFileControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    defaultValueFilename?: string;
    defaultValueMimetype?: string;
    fileAccept?: string;
    outputFormat?: 'base64' | 'file';
    invalidFileTypeMessageDetail?: string;
    invalidFileSizeMessageDetail?: string;
    maxFileSize?: number;
    thumbnailSize?: string;
    allowZoom?: boolean;
    showFileSize?: boolean;
    dragIconClass?: string;
    inputMessage?: string;
    dragMessage?: string;
    shortenLength?: number;
    shortenSeparator?: string;
    useGlobalLoader?: boolean;
    _file?: File;
    base64?: string;
    _fileName?: string;
    _fileExtension?: string;
    _fileType?: string;
    _clearMethod?: () => void;
    _setFile?: (event: File[], _cdf: ChangeDetectorRef) => void;
    _cdf?: ChangeDetectorRef;
}

export interface SmzRadioControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T;

}

export interface SmzCheckBoxControl extends SmzFormsBaseControl
{
    showLabel?: boolean;
    label?: string;
    defaultValue?: Boolean;

}

export interface SmzCheckBoxGroupControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T[];

}

export interface SmzDropDownControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T | SimpleEntity<T>;
    showFilter?: Boolean;
    autofocusFilter?: boolean;
    filterMatchMode?: DefaultPrimeNgFilterMatchMode | any;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    showClear?: boolean;

}

export type DefaultPrimeNgFilterMatchMode = 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

export interface SmzLinkedDropDownControl<T> extends SmzFormsBaseControl, SmzFormBaseLinkedControl
{
    options?: SimpleParentEntity<T>[];
    defaultValue?: T;
    showFilter?: Boolean;
    autofocusFilter?: boolean;
    filterMatchMode?: DefaultPrimeNgFilterMatchMode | any;
    dependsOn?: { propertyName: string, formId?: string };
    emptyMessage?: string;
    emptyFilterMessage?: string;
    showClear?: boolean;
}

export interface SmzLinkedMultiSelectControl<T> extends SmzFormsBaseControl, SmzFormBaseLinkedControl
{
    options?: SimpleParentEntity<T>[];
    currentOptions?: T[];
    defaultValue?: T[];
    showFilter?: Boolean;
    autofocusFilter?: boolean;
    filterMatchMode?: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';
    dependsOn?: { propertyName: string, formId?: string };
    defaultLabel?: string;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    showClear?: boolean;

}

export interface SmzMultiSelectControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T[] | SimpleEntity<T>[];
    showFilter?: Boolean;
    autofocusFilter?: boolean;
    filterMatchMode?: DefaultPrimeNgFilterMatchMode | any;
    defaultLabel?: string;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    showClear?: boolean;

}

export interface SmzTreeControl<T> extends SmzFormsBaseControl, SmzFormBaseLinkedControl
{
    options?: ParentEntity<string, SmzTreeNode<T>>[];
    currentNodes?: SmzTreeNode<T>[];
    defaultValue?: (T | SimpleEntity<T>)[];
    showFilter?: Boolean;
    autofocusFilter?: boolean;
    emptyMessage?: string;
    emptyFilterMessage?: string;
    showClear?: boolean;
    selectionMode?: 'multiple' | 'checkbox' | 'single';
    scrollHeight?: string;
    display?: 'comma' | 'chip';
    content: SmzTreeSourceTransform;
    dependsOn?: { propertyName: string, formId?: string };
    allTypes: string[]
}

export interface SmzFormBaseLinkedControl {
    options?: any;
    defaultValue?: any;
    readonly propertyName?: string;
    dependsOn?: { propertyName: string, formId?: string };
    _inputFormControl?: AbstractControl;
    readonly type?: SmzControlType;
}
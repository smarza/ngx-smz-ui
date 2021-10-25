import { AbstractControl, FormGroup } from '@angular/forms';
import { SmzControlType, SmzControlTypes, SmzCalendarControl, SmzCurrencyControl, SmzPasswordControl, SmzSwitchControl, SmzTextControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzMultiSelectControl, SmzNumberControl, SmzRadioControl, SmzTextAreaControl, SmzMaskControl, SmzLinkedMultiSelectControl, SmzListControl, SmzTagAreaControl, SmzContentMaskControl } from './control-types';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { flatten, isArray } from '../../../common/utils/utils';
import { executeTextPattern } from './text-patterns';
import { cloneDeep } from 'lodash-es';
import { SmzSmartTagData } from '../directives/smart-tag.directive';
import { mapInputContentMaskText, unmapInputContentMaskText } from '../components/input-content-mask/input-content-mask.pipe';

export interface SmzControlTypeFunctionsDefinitions
{
    initialize: (input: SmzControlTypes, config: SmzDialogsConfig) => void;
    clear: (control: AbstractControl, clearMethod?: () => void) => void;
    updateValue: (control: AbstractControl, input: SmzControlTypes) => void;
    getValue: (form: FormGroup, input: SmzControlTypes, flattenResponse: boolean) => any;

}

export const CONTROL_FUNCTIONS: { [key: string]: SmzControlTypeFunctionsDefinitions } =
{
    [SmzControlType.CALENDAR]: {
        initialize: (input: SmzCalendarControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCalendarControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCalendarControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CALENDAR', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CHECKBOX]: {
        initialize: (input: SmzCheckBoxControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCheckBoxControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCheckBoxControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CHECKBOX', value, value ?? false);
            return mapResponseValue(input, value ?? false, false);
        },
    },
    [SmzControlType.CHECKBOX_GROUP]: {
        initialize: (input: SmzCheckBoxGroupControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCheckBoxGroupControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCheckBoxGroupControl<any>, flattenResponse: boolean) =>
        {
            const values = form.get(input.propertyName).value ?? [];
            const options = input.options.filter(x => values.includes(x.id));
            // console.log('getValue CHECKBOX_GROUP', values, options);
            return mapResponseValue(input, options, flattenResponse);
        },
    },
    [SmzControlType.COLOR_PICKER]: {
        initialize: (input: SmzColorPickerControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzColorPickerControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzColorPickerControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue COLOR_PICKER', value);
            const response = value == null ? '' : (value.includes('#') ? value : `#${value}`);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CURRENCY]: {
        initialize: (input: SmzCurrencyControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCurrencyControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCurrencyControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CURRENCY', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.DROPDOWN]: {
        initialize: (input: SmzDropDownControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzDropDownControl<any>) =>
        {

            if (input.defaultValue == null)
            {
                // Nenhum default value foi encontrado
                control.patchValue(null);
            }
            else if (input.defaultValue.id != null)
            {
                // Default value encontrado no formato SimpleEntity
                control.patchValue(input.options.find(x => x.id === input.defaultValue.id));
            }
            else
            {
                // Default value encontrado no formato string
                const value = input.options.find(x => x.id === input.defaultValue);
                control.patchValue(value ?? '');
            }

        },
        getValue: (form: FormGroup, input: SmzDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.FILE]: {
        initialize: (input: SmzFileControl, config: SmzDialogsConfig) => {
            input._base64 = null;
            input._clearMethod = null;
            input._file = null;
            input._fileName = null;
        },
        clear: (control: AbstractControl, clearMethod?: () => void) => {
            control.patchValue('');
            clearMethod();
        },
        updateValue: (control: AbstractControl, input: SmzFileControl) =>
        {
            control.patchValue(input.defaultValue);
        },
        getValue: (form: FormGroup, input: SmzFileControl, flattenResponse: boolean) =>
        {
            const value = input.outputFormat == null || input.outputFormat === 'base64' ? input._base64 : input._file;

            // console.log('getValue FILE form value', form.get(input.propertyName).value);
            // console.log('getValue _file', input._file);
            const response = mapResponseValue(input, value, false);

            if (value != null)
            {
                response[`${input.propertyName}Filename`] = input._fileName;
            }

            return response;

        },
    },
    [SmzControlType.LINKED_DROPDOWN]: {
        initialize: (input: SmzLinkedDropDownControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzLinkedDropDownControl<any>) =>
        {
            if (input.defaultValue != null && input.defaultValue != '')
            {

                const parent = input.options.find(x => x.data.find(d => d.id === input.defaultValue));
                const option = parent.data.find(d => d.id === input.defaultValue);
                control.patchValue(option ?? '');
            }
            else
            {
                control.patchValue(input.defaultValue);
            }
        },
        getValue: (form: FormGroup, input: SmzLinkedDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.MULTI_SELECT]: {
        initialize: (input: SmzMultiSelectControl<any>, config: SmzDialogsConfig) =>
        {
            // console.log('config', config);
            const preset = config.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzMultiSelectControl<any>) =>
        {
            if (input.defaultValue == null || input.defaultValue?.length === 0)
            {
                // Nenhum default value foi encontrado
                control.patchValue([]);
            }
            else if (input.defaultValue[0].id != null)
            {
                // Default value encontrado no formato SimpleEntity
                control.patchValue(input.options?.filter(o => input.defaultValue?.findIndex(d=> d.id === o.id) > -1));
            }
            else
            {
                // Default value encontrado no formato string
                const value = input.options?.filter(o => input.defaultValue?.findIndex(d=> d === o.id) > -1);
                control.patchValue(value ?? '');
            }
        },
        getValue: (form: FormGroup, input: SmzMultiSelectControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue MULTI_SELECT', value);
            return mapResponseValue(input, value ?? [], flattenResponse);
        },
    },
    [SmzControlType.LINKED_MULTISELECT]: {
        initialize: (input: SmzLinkedMultiSelectControl<any>, config: SmzDialogsConfig) =>
        {
            // console.log('config', config);
            const preset = config.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzLinkedMultiSelectControl<any>) =>
        {
            if (input.defaultValue != null && input.defaultValue.length > 0)
            {
                const parent = input.options.find(x => x.data.find(d => d.id === input.defaultValue));
                const option = parent.data.find(d => d.id === input.defaultValue);

                control.patchValue(option ?? '');
            }
            else
            {
                control.patchValue(input.defaultValue);
            }
        },
        getValue: (form: FormGroup, input: SmzLinkedDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.NUMBER]: {
        initialize: (input: SmzNumberControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzNumberControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzNumberControl, flattenResponse: boolean) =>
        {
            const value = Number(form.get(input.propertyName).value);
            // console.log('getValue NUMBER', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.PASSWORD]: {
        initialize: (input: SmzPasswordControl, config: SmzDialogsConfig) => {
            const preset = config.forms.controlTypes[SmzControlType.PASSWORD] as SmzPasswordControl;

            // console.log('config', config);
            // console.log('preset', preset);
            // console.log('input1', input);

            input.feedback = input.feedback ?? preset?.feedback;
            input.toggleMask = input.toggleMask ?? preset?.toggleMask;
            input.promptLabel = input.promptLabel ?? preset?.promptLabel;
            input.weakLabel = input.weakLabel ?? preset?.weakLabel;
            input.mediumLabel = input.mediumLabel ?? preset?.mediumLabel;
            input.strongLabel = input.strongLabel ?? preset?.strongLabel;
            input.mediumRegex = input.mediumRegex ?? preset?.mediumRegex;
            input.strongRegex = input.strongRegex ?? preset?.strongRegex;

            // console.log('input2 ', input);
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzPasswordControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzPasswordControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue PASSWORD', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.RADIO]: {
        initialize: (input: SmzRadioControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzRadioControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzRadioControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue RADIO', value);
            const response = input.options.find(d => d.id === value);
            return mapResponseValue(input, response, flattenResponse);
        },
    },
    [SmzControlType.SWITCH]: {
        initialize: (input: SmzSwitchControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzSwitchControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzSwitchControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue SWITCH', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.LIST]: {
        initialize: (input: SmzListControl, config: SmzDialogsConfig) => {
            // input.defaultValue = cloneDeep(input.options);
            input.options = cloneDeep(input.options);

            if (input.editMode == null) input.editMode = 'dialog';
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzListControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzListControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue LIST BEFORE', value);

            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT]: {
        initialize: (input: SmzTextControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzTextControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzTextControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            // console.log('getValue TEXT BEFORE', value);
            value = executeTextPattern(value, input.exportPattern);

            // console.log('getValue TEXT AFTER exportPattern', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT_AREA]: {
        initialize: (input: SmzTextAreaControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzTextAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzTextAreaControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            value = executeTextPattern(value, input.exportPattern);

            // console.log('getValue TEXT_AREA', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CONTENT_MASK]: {
        initialize: (input: SmzContentMaskControl, config: SmzDialogsConfig) => {},
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzContentMaskControl) => {
            const mapped = mapInputContentMaskText(input);
            control.patchValue(mapped);
        },
        getValue: (form: FormGroup, input: SmzContentMaskControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            const unmapped = unmapInputContentMaskText(value, input.variableId, input.tagClass, input.variableBegin, input.variableEnd, input.exportHtmlNewLine);

            return mapResponseValue(input, unmapped, false);
        },
    },
    [SmzControlType.TAG_AREA]: {
        initialize: (input: SmzTagAreaControl, config: SmzDialogsConfig) => {

            // console.log('#########################');
            // console.log('before defaultValue', input.defaultValue);

            if (input.config.tagCharacteres.open == null) input.config.tagCharacteres.open = '[';
            if (input.config.tagCharacteres.close == null) input.config.tagCharacteres.close = ']';

            const open = input.config.tagCharacteres.open;
            const close = input.config.tagCharacteres.close;

            if (input.defaultValue != null && input.defaultValue !== '')
            {
                const options: SmzSmartTagData[] = flatten(input.config.options.map(x => x.data));

                options?.forEach(option =>
                    {
                        // console.log('------------------');
                        // console.log('---- option', option);
                        input.defaultValue = input.defaultValue.split(option.value).join(`${open}${option.key}${close}`);
                        // console.log('---- defaultValue', input.defaultValue);
                    });
            }

            // console.log('after defaultValue', input.defaultValue);
            // console.log('#########################');

        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzTagAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzTagAreaControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;

            if (value == null) return mapResponseValue(input, value, false);

            value = executeTextPattern(value, input.exportPattern);

            let tags = value.match(/(\[)+[a-z+A-Z+0-9\D\d\S\s].*?]/g);

            const options: SmzSmartTagData[] = flatten(input.config.options.map(x => x.data));

            let result: string = value;

            tags?.forEach(tag =>
                {
                    const optionTag = options.find(o => `${input.config.tagCharacteres.open}${o.key}${input.config.tagCharacteres.close}` === tag);

                    if (optionTag) {
                        result = result.replace(tag, optionTag.value);
                    }
                });

            return mapResponseValue(input, result, false);

        },
    },
    [SmzControlType.TEXT_MASK]: {
        initialize: (input: SmzMaskControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzMaskControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzMaskControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            value = executeTextPattern(value, input.exportPattern);
            // console.log('getValue TEXT_MASK', value);
            return mapResponseValue(input, value, false);
        },
    },
}

function mapResponseValue(input: SmzControlTypes, value: any, formFlattenResponseConfig: boolean): { [key: string]: any }
{
    const inputOverrideResponseConfig = input.advancedSettings?.overrideResponseFormat

    const returnFlatten = inputOverrideResponseConfig == null ?
        formFlattenResponseConfig :
        inputOverrideResponseConfig === 'flat';

    if (returnFlatten)
    {

        if (isArray(value))
        {
            return { [flatPropertyName(input.propertyName, true)]: value.map(x => x.id) };
        }
        else
        {
            return { [flatPropertyName(input.propertyName, false)]: value?.id };
        }
    }
    else
    {
        if (isArray(value))
        {
            return { [input.propertyName]: value };
        }
        else
        {
            return { [input.propertyName]: value };
        }
    }

}

function flatPropertyName(propertyName: string, isArray: boolean): string
{
    return `${propertyName}${isArray ? 'Ids' : 'Id'}`;
}

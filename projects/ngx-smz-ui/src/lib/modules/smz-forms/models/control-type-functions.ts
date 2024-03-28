import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { SmzControlType, SmzControlTypes, SmzCalendarControl, SmzCurrencyControl, SmzPasswordControl, SmzSwitchControl, SmzTextControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzMultiSelectControl, SmzNumberControl, SmzRadioControl, SmzTextAreaControl, SmzMaskControl, SmzLinkedMultiSelectControl, SmzListControl, SmzTagAreaControl, SmzContentMaskControl, SmzTextButtonControl, SmzTreeControl, SmzAutocompleteTagAreaControl } from './control-types';
import { flatten, isArray, isString } from '../../../common/utils/utils';
import { executeTextPattern } from './text-patterns';
import { cloneDeep } from 'lodash-es';
import { SmzSmartTagData } from '../directives/smart-tag.directive';
import { mapInputContentMaskText, unmapInputContentMaskText } from '../components/input-content-mask/input-content-mask.pipe';
import { GlobalInjector } from '../../../common/services/global-injector';
import { UUID } from 'angular2-uuid';
import { TreeHelpers } from '../../smz-trees/utils/tree-helpers';
import { resolveTreeNodeSelection } from '../../smz-trees/models/node-helper';

export interface SmzControlTypeFunctionsDefinitions
{
    initialize: (input: SmzControlTypes) => void;
    clear: (control: AbstractControl, clearMethod?: () => void) => void;
    applyDefaultValue: (control: AbstractControl, input: SmzControlTypes) => void;
    getValue: (form: UntypedFormGroup, input: SmzControlTypes, flattenResponse: boolean) => any;
    setValue?: (control: AbstractControl, input: SmzControlTypes, value: any) => void;

}

export const CONTROL_FUNCTIONS: { [key: string]: SmzControlTypeFunctionsDefinitions } =
{
    [SmzControlType.CALENDAR]: {
        initialize: (input: SmzCalendarControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzCalendarControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzCalendarControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CALENDAR', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CHECKBOX]: {
        initialize: (input: SmzCheckBoxControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzCheckBoxControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzCheckBoxControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CHECKBOX', value, value ?? false);
            return mapResponseValue(input, value ?? false, false);
        },
    },
    [SmzControlType.CHECKBOX_GROUP]: {
        initialize: (input: SmzCheckBoxGroupControl<any>) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzCheckBoxGroupControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzCheckBoxGroupControl<any>, flattenResponse: boolean) =>
        {
            const values = form.get(input.propertyName).value ?? [];
            const options = input.options.filter(x => values.includes(x.id));
            // console.log('getValue CHECKBOX_GROUP', values, options);
            return mapResponseValue(input, options, flattenResponse);
        },
    },
    [SmzControlType.COLOR_PICKER]: {
        initialize: (input: SmzColorPickerControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzColorPickerControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzColorPickerControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue COLOR_PICKER', value);
            const response = value == null ? '' : (value.includes('#') ? value : `#${value}`);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CURRENCY]: {
        initialize: (input: SmzCurrencyControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzCurrencyControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzCurrencyControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CURRENCY', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.DROPDOWN]: {
        initialize: (input: SmzDropDownControl<any>) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzDropDownControl<any>) =>
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
        getValue: (form: UntypedFormGroup, input: SmzDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.FILE]: {
        initialize: (input: SmzFileControl) => {
            input.base64 = null;
            input._clearMethod = null;
            input._file = null;
            input._fileName = null;
        },
        clear: (control: AbstractControl, clearMethod?: () => void) => {
            control.patchValue('');
            clearMethod();
        },
        applyDefaultValue: (control: AbstractControl, input: SmzFileControl) =>
        {
            control.patchValue(input.defaultValue);

            // if (!isEmpty(input.defaultValue)) {

            //     // console.log('FILE updateValue', control, input);
            //     const file = dataURLtoFile(input.defaultValue, input.name);

            //     setTimeout(() => {
            //         input._setFile([file], input._cdf);
            //     }, 200);

            // }
            // else {
            //     control.patchValue(input.defaultValue);
            // }

        },
        getValue: (form: UntypedFormGroup, input: SmzFileControl, flattenResponse: boolean) =>
        {
            // const value = input._file;
            const value = input.outputFormat == null || input.outputFormat === 'base64' ? input.base64 : input._file;

            // console.log('getValue FILE form value', form.get(input.propertyName).value);
            // console.log('getValue _file', input._file);
            const response = mapResponseValue(input, value, false);

            if (value != null)
            {
                response[`${input.propertyName}Filename`] = input._fileName;
            }

            // console.log('getValue _file response', response);

            return response;

        },
    },
    [SmzControlType.LINKED_DROPDOWN]: {
        initialize: (input: SmzLinkedDropDownControl<any>) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzLinkedDropDownControl<any>) =>
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
        getValue: (form: UntypedFormGroup, input: SmzLinkedDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.MULTI_SELECT]: {
        initialize: (input: SmzMultiSelectControl<any>) =>
        {
            // console.log('config', config);
            const preset = GlobalInjector.config.dialogs.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzMultiSelectControl<any>) =>
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
        getValue: (form: UntypedFormGroup, input: SmzMultiSelectControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue MULTI_SELECT', value);
            return mapResponseValue(input, value ?? [], flattenResponse);
        },
    },
    [SmzControlType.LINKED_MULTISELECT]: {
        initialize: (input: SmzLinkedMultiSelectControl<any>) =>
        {
            // console.log('config', config);
            const preset = GlobalInjector.config.dialogs.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzLinkedMultiSelectControl<any>) =>
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
        getValue: (form: UntypedFormGroup, input: SmzLinkedDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.NUMBER]: {
        initialize: (input: SmzNumberControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzNumberControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzNumberControl, flattenResponse: boolean) =>
        {
            const value = Number(form.get(input.propertyName).value);
            // console.log('getValue NUMBER', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.PASSWORD]: {
        initialize: (input: SmzPasswordControl) => {
            const preset = GlobalInjector.config.dialogs.forms.controlTypes[SmzControlType.PASSWORD] as SmzPasswordControl;

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
        applyDefaultValue: (control: AbstractControl, input: SmzPasswordControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzPasswordControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue PASSWORD', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.RADIO]: {
        initialize: (input: SmzRadioControl<any>) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzRadioControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzRadioControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue RADIO', value);
            const response = input.options.find(d => d.id === value);
            return mapResponseValue(input, response, flattenResponse);
        },
    },
    [SmzControlType.SWITCH]: {
        initialize: (input: SmzSwitchControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(false); },
        applyDefaultValue: (control: AbstractControl, input: SmzSwitchControl) => { control.patchValue(input.defaultValue ?? false); },
        getValue: (form: UntypedFormGroup, input: SmzSwitchControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue SWITCH', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.LIST]: {
        initialize: (input: SmzListControl) => {
            // input.defaultValue = cloneDeep(input.options);
            input.options = cloneDeep(input.defaultValue);

            if (input.options != null) {
                input.listBoxOptions = input.options.map(x => ({ id: UUID.UUID(), name: x }));
            }

            if (input.editMode == null) input.editMode = 'dialog';
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzListControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzListControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue LIST BEFORE', value);

            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT]: {
        initialize: (input: SmzTextControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzTextControl) => {
            control.patchValue(input.defaultValue);
        },
        getValue: (form: UntypedFormGroup, input: SmzTextControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            // console.log('getValue TEXT BEFORE', value);
            value = executeTextPattern(value, input.exportPattern);

            // console.log('getValue TEXT AFTER exportPattern', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT_BUTTON]: {
        initialize: (input: SmzTextButtonControl) => {
            input.isButtonValid = false;
            input.buttonMessages = [];
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzTextButtonControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzTextButtonControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT_AREA]: {
        initialize: (input: SmzTextAreaControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzTextAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzTextAreaControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            value = executeTextPattern(value, input.exportPattern);

            // console.log('getValue TEXT_AREA', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CONTENT_MASK]: {
        initialize: (input: SmzContentMaskControl) => {
            // Expressão para localizar as tags originais
            const expression = new RegExp(/(<[^\/].*?>)(.*?)(<[\/].*?>)/gm);
            const variables = [];

            // Loop para encontrar todas as variáveis
            let value = expression.exec(input.defaultValue);

            while(value != null) {
                // Inserir variável encontrada
                // Cada variável será armazenada em um array de 4 elementos, sendo total [0], tag de abertura [1], valor [2] e tag de fechamento [3].
                variables.push(value);

                // Localizar próximo match
                value = expression.exec(input.defaultValue);
             }

            // Substituir as tags originais pelo padrão do content mask: {{value}}
            input.defaultValue = input.defaultValue.replace(expression, a => {

                // Resultado da busca será um array de 2 elementos, sendo total [0] e valor [1]
                const variable = new RegExp(/<[^\/].*?>(.*)<[\/].*?>/gm).exec(a);

                if (variable.length != 2) throw new Error(`Some wrong when trying to extract variable value of ${variable}`);

                // Retornando formato {{value}}
                return `${input.variableBegin}${variable[1]}${input.variableEnd}`;
              });

            // Armazenar variaveis originais para usar do mapping de getValue (response)
            input._originalVariables = variables;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzContentMaskControl) => {
            const mapped = mapInputContentMaskText(input);
            control.patchValue(mapped);
        },
        getValue: (form: UntypedFormGroup, input: SmzContentMaskControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;

            // Capturar valores do texto sem as tags de estilos do content mask
            const unmapped = unmapInputContentMaskText(value, input.variableId, input.tagClass, input.variableBegin, input.variableEnd, input.exportHtmlNewLine);

            // Expressão para localizar as tags {{value}}
            const expression = new RegExp(`${input.variableBegin}.*?${input.variableEnd}`, 'gm');

            // Loop para substituir as tags {{value}} pela sua respectiva variável original
            let originalFormat = unmapped;
            let originalValue = expression.exec(unmapped);
            let index = 0;

            while(originalValue != null) {

                // Substituir bloco por variavel original
                // Esse regex não pode ser global para que substitua apenas um bloco por vez,
                // assim a ordem do original baterá perfeitamente com a sequencia da busca
                originalFormat = originalFormat.replace(new RegExp(`${input.variableBegin}.*?${input.variableEnd}`, ''), input._originalVariables[index][0]);

                // Localizar próximo match
                originalValue = expression.exec(unmapped);

                index++;
             }

            return mapResponseValue(input, originalFormat, false);
        },
    },
    [SmzControlType.TAG_AREA]: {
        initialize: (input: SmzTagAreaControl) => {

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
                        input.defaultValue = input.defaultValue.split(option.value).join(`${open}${option.id}${close}`);
                        // console.log('---- defaultValue', input.defaultValue);
                    });
            }

            // console.log('after defaultValue', input.defaultValue);
            // console.log('#########################');

        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzTagAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzTagAreaControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;

            if (value == null) return mapResponseValue(input, value, false);

            value = executeTextPattern(value, input.exportPattern);

            let tags = value.match(/(\[)+[a-z+A-Z+0-9\D\d\S\s].*?]/g);

            const options: SmzSmartTagData[] = flatten(input.config.options.map(x => x.data));

            let result: string = value;

            tags?.forEach(tag =>
                {
                    const optionTag = options.find(o => `${input.config.tagCharacteres.open}${o.id}${input.config.tagCharacteres.close}` === tag);

                    if (optionTag) {
                        result = result.replace(tag, optionTag.value);
                    }
                });

            return mapResponseValue(input, result, false);

        },
    },

    [SmzControlType.AUTOCOMPLETE_TAG_AREA]: {
        initialize: (input: SmzAutocompleteTagAreaControl) => {

            // console.log('#########################');
            // console.log('before defaultValue', input.defaultValue);

            if (input.config.tagCharacteres.open == null) input.config.tagCharacteres.open = '[';
            if (input.config.tagCharacteres.close == null) input.config.tagCharacteres.close = ']';

            const open = input.config.tagCharacteres.open;
            const close = input.config.tagCharacteres.close;

            // if (input.defaultValue != null && input.defaultValue !== '')
            // {
            //     const options: string[] = flatten(input.config.options.map(x => x.suggestions));

            //     options?.forEach(option =>
            //         {
            //             // console.log('------------------');
            //             // console.log('---- option', option);
            //             input.defaultValue = input.defaultValue.split(option).join(`${open}${option}${close}`);
            //             // console.log('---- defaultValue', input.defaultValue);
            //         });
            // }

            // console.log('after defaultValue', input.defaultValue);
            // console.log('#########################');

        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzAutocompleteTagAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzAutocompleteTagAreaControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;

            if (value == null) return mapResponseValue(input, value, false);

            value = executeTextPattern(value, input.exportPattern);

            let tags = value.match(/(\[)+[a-z+A-Z+0-9\D\d\S\s].*?]/g);

            const suggestions: string[] = flatten(input.config.options.map(x => x.suggestions));

            let result: string = value;

            tags?.forEach(tag =>
                {
                    const suggestion = suggestions.find(o => `${input.config.tagCharacteres.open}${o}${input.config.tagCharacteres.close}` === tag);

                    if (suggestion) {
                        result = result.replace(tag, suggestion);
                    }
                });

            return mapResponseValue(input, result, false);

        },
    },
    [SmzControlType.TEXT_MASK]: {
        initialize: (input: SmzMaskControl) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzMaskControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: UntypedFormGroup, input: SmzMaskControl, flattenResponse: boolean) =>
        {
            let value = form.get(input.propertyName).value;
            value = executeTextPattern(value, input.exportPattern);
            // console.log('getValue TEXT_MASK', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TREE]: {
        initialize: (input: SmzTreeControl<any>) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        applyDefaultValue: (control: AbstractControl, input: SmzTreeControl<any>) =>
        {
            const value = input.defaultValue;

            if (input.currentNodes == null) {
                control.patchValue(null);
                return;
            }

            if (value == null || input.options == null || input.options?.length === 0)
            {
                // Nenhum default value foi encontrado
                control.patchValue(null);
                return;
            }

            let defaultKeys: string[] = [];

            if (value.every(x => x.id != null))
            {
                // Default value encontrado no formato SimpleEntity
                defaultKeys = value.map(x => x.id);
            }
            else if (value.every(x => isString(x)))
            {
                // Default value encontrado no formato string
                defaultKeys = value as string[];
            }
            else {
                console.log('O default value da tree parece não estar no padrão (array de string, ou array de Ids).', value);
            }

            const match = TreeHelpers.findTreeNodesByKeys(input.currentNodes, defaultKeys);

            if (match.length === 0) {
                // Nenhum default encontrado nos nós atuais
                control.patchValue(null);
                return;
            }

            const selection = resolveTreeNodeSelection(input.currentNodes, defaultKeys, true);

            // console.log('match', match);
            // console.log('selection', selection);

            if (input.selectionMode === 'single') {
                CONTROL_FUNCTIONS[SmzControlType.TREE].setValue(control, input, selection[0]);
            }
            else {
                CONTROL_FUNCTIONS[SmzControlType.TREE].setValue(control, input, selection);
            }

        },
        setValue: (control: AbstractControl, input: SmzTreeControl<any>, value: any) =>
        {
            if (value == null)
            {
                // Nenhum default value foi encontrado
                control.patchValue(null);
                return;
            }

            control.patchValue(value);

        },
        getValue: (form: UntypedFormGroup, input: SmzDropDownControl<any>, flattenResponse: boolean) =>
        {
            // console.log('#####');
            // console.log('getValue', form, input, flattenResponse);
            const value = form.get(input.propertyName).value;
            // console.log('value', value);

            if (isArray(value)) {

                if (value.every(x => x.id != null)) {
                    return mapResponseValue(input, value.map(x => x.id), flattenResponse);
                }

                if (value.every(x => x.key != null)) {
                    return mapResponseValue(input, value.map(x => x.key), flattenResponse);
                }

                return mapResponseValue(input, value?.data, flattenResponse);
            }

            // console.log('getValue SINGLE', value?.data);
            return mapResponseValue(input, value?.data, flattenResponse);
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
            // console.log('value', value);
            if (value.every(x => x.id != null)) {
                return { [flatPropertyName(input.propertyName, true)]: value.map(x => x.id) };
            }

            return { [flatPropertyName(input.propertyName, true)]: value };
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

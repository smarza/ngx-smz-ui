import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { ValidationMessage } from '../models/advanced';
import { SmzControlType, SmzControlTypes, SmzDropDownControl, SmzLinkedControlTypes, SmzLinkedDropDownControl } from '../models/control-types';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { SmzTemplate } from '../../../common/models/templates';
import { SmzFormsDropdownService } from './smz-forms-dropdown.service';
import { SmzForm } from '../models/smz-forms';
import { SmzFormsVisibilityService } from './smz-forms-visibility.service';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsManagerService
{

    constructor(public configService: SmzDialogsConfig, private dropDownService: SmzFormsDropdownService, private service: SmzFormsVisibilityService) { }

    public getValidators(control: SmzControlTypes): Validators
    {
        const validators: ValidatorFn[] = [];
        const config = this.configService.forms?.validators;
        const input = control.validatorsPreset;

        const isRequired = this.checkValidatorPreset(config.isRequired, input?.isRequired);
        // console.log(input);
        // console.log('config.isRequired', config.isRequired);
        // console.log('input?.isRequired', input?.isRequired);
        // console.log('isRequired', isRequired);
        if (isRequired != null) validators.push(Validators.required);

        const min = this.checkValidatorPreset(config.min, input?.min);
        if (min != null) validators.push(Validators.min(min));

        const max = this.checkValidatorPreset(config.max, input?.max);
        if (max != null) validators.push(Validators.max(max));

        const minLength = this.checkValidatorPreset(config.minLength, input?.minLength);
        if (minLength != null) validators.push(Validators.minLength(minLength));

        const maxLength = this.checkValidatorPreset(config.maxLength, input?.maxLength);
        if (maxLength != null) validators.push(Validators.maxLength(maxLength));

        const response = [...validators, ...(control.advancedSettings?.validators ?? [])];

        return response.length > 0 ? Validators.compose(response) : [];
    }

    public getValidatorsMessages(control: SmzControlTypes): ValidationMessage[]
    {
        const response: ValidationMessage[] = [];

        response.push(...(this.configService?.forms?.validationMessages ?? []));

        if (control.advancedSettings?.validationMessages != null)
        {
            control.advancedSettings.validationMessages.forEach(v =>
            {
                const matchIndex = response.findIndex(r => r.type === v.type);

                if (matchIndex > -1)
                {
                    response[matchIndex].message = v.message;
                }
                else
                {
                    response.push(v);
                }
            })
        }
        return response;
    }


    private checkValidatorPreset(fromConfig: any, fromInput: any): any
    {
        if (fromInput == false) return null;
        else if (fromInput) return fromInput;
        else if (fromConfig) return fromConfig;
        else return null;
    }

    public setupTemplate(dataTemplate: SmzTemplate, configTemplate: SmzTemplate): SmzTemplate
    {

        // USING USER'S TEMPLATE
        if (dataTemplate != null) return dataTemplate;

        // USING CONFIG'S TEMPLATE
        if (configTemplate != null) return configTemplate;

        // USING BUILT-IN PRESET
        return {
            extraSmall: {
                row: 'col-12',
                horizontalAlignment: 'justify-content-start',
                verticalAlignment: 'align-items-start'
            }
        };

    }

    public setupGlobalStyles(): void
    {
        // console.log('setupGlobalStyles...');

        const globalScale = this.configService?.forms?.globalStyleScale != null ?
            `${this.configService?.forms?.globalStyleScale}rem` : // USING USER'S TEMPLATE
            `1rem`; // USING BUILT-IN PRESET

        document.documentElement.style.setProperty('--smz-form-global-scale', globalScale);

        const spacer = this.configService?.forms?.spacer != null ?
            this.configService.forms.spacer : // USING USER'S TEMPLATE
            `0.4em`; // USING BUILT-IN PRESET

        document.documentElement.style.setProperty('--smz-spacer', spacer);

    }

    public setupDropdownServices(input: SmzDropDownControl<any>, form: SmzForm<any>): void
    {

        if (input.defaultValue !== null)
        {
            const value = input.defaultValue;

            const option = input.options.find(x => x.id === value);

            if (option != null)
            {
                this.dropDownService.setValue(input, form.formId, { originalEvent: null, value: option });
            }
        }
    }

    public setupLinkedDropdownServices(input: SmzLinkedDropDownControl<any>, form: SmzForm<any>): void
    {
        // console.log('----- setupLinkedDropdownServices');

        if (input.defaultValue !== null)
        {
            const value = input.defaultValue;

            const option = input.options.find(x => x.parentId === value);
            // console.log('setupLinkedDropdownServices option...', option);

            if (option != null)
            {
                this.dropDownService.setValue(input, form.formId, { originalEvent: null, value: option });
            }
        }
    }

    public setupVisibilityServices(inputData: SmzControlTypes, form: SmzForm<any>): void
    {
        if (inputData.visibilityDependsOn != null)
        {
            this.service.registryObserver(inputData, form.formId);

            if (inputData.visibilityDependsOn.formId == null)
            {
                for (const group of form.groups)
                {
                    for (const input of group.children)
                    {
                        // console.log('--------');
                        if (input.propertyName === inputData.visibilityDependsOn.propertyName)
                        {

                            let eventValue = null;

                            switch (input.type)
                            {
                                case SmzControlType.CHECKBOX:
                                    eventValue = input.defaultValue;
                                    break;

                                case SmzControlType.DROPDOWN:

                                    if (inputData.visibilityDependsOn.conditions != null) {
                                        eventValue = inputData.visibilityDependsOn.conditions.findIndex(c => c === input.defaultValue) !== -1;
                                    }
                                    else {
                                        eventValue = input.defaultValue === inputData.visibilityDependsOn.condition;
                                    }

                                    break;
                                default:
                                    break;
                            }

                            // console.log('input', input);
                            // console.log('inputData', inputData);
                            inputData.isVisible = !inputData.visibilityDependsOn.reversed && eventValue || inputData.visibilityDependsOn.reversed && !eventValue;
                        }
                    }
                }
            }
            else
            {
                console.log(`Não foi encontrada a dependencia para o Input ${inputData.propertyName}. Provavelmente o formId está setado errado ou é de form de terceiros.`);
            }

        }
    }

}

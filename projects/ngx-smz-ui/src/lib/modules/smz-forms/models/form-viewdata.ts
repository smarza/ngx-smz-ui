import { ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { mergeClone } from '../../../common/utils/deep-merge';
import { SmzFormsManagerService } from '../services/smz-forms-manager.service';
import { CONTROL_FUNCTIONS } from './control-type-functions';
import { SmzControlType, SmzControlTypes, SmzTextButtonControl } from './control-types';
import { SmzForm, SmzFormsResponse } from './smz-forms';
import { createObjectFromString } from '../../../common/utils/utils';

export class SmzFormViewdata {
    public isValid: boolean = false;
    public hasChanges: boolean = false;
    public originalState: string = '';

    constructor(
        public config: SmzForm<any>,
        public form: UntypedFormGroup,
        public manager: SmzFormsManagerService,
        public cdf: ChangeDetectorRef
    ) { }

    /** Retorna o objeto com os valores dos inputs; Esse objeto seguirá a nomemclatura do campo name de cada inputConfig */
    public getData<T>(): SmzFormsResponse<T> {

        if (this.config.isDebug) {
            console.log('--------------------------');
            console.log('-------- getData ---------');
        }

        const data: T = {} as T;
        const response: SmzFormsResponse<T> = { data, isValid: true, hasUnsavedChanges: false };
        const formFlattenResponse = this.config.behaviors?.flattenResponse ?? false;

        for (const group of this.config.groups) {
            for (const input of group.children) {

                if (this.config.isDebug) {
                    console.log('--------------------------');
                    console.log(`> ${input.propertyName}`, input);
                }

                if (input.advancedSettings == null || !input.advancedSettings.excludeFromResponse) {

                    const value = CONTROL_FUNCTIONS[input.type].getValue(this.form, input, formFlattenResponse);

                    if (input.visibilityDependsOn == null || input.isVisible) {

                        if (group.isHide) {
                            // Forçando a validação para true porque o grupo esta oculto
                            response.isValid = response.isValid && true;
                        }
                        else if (input.isDisabled) {
                            // Forçando a validação para true porque o campo esta desabilitado
                            response.isValid = response.isValid && true; // this.manager.manuallyValidate(input, value);
                        }
                        else if (input.type === SmzControlType.TEXT_BUTTON) {
                            const textButtonInput = input as SmzTextButtonControl;
                            response.isValid = response.isValid && input._inputFormControl.valid && textButtonInput.isButtonValid;
                        }
                        else if (input.type === SmzControlType.CHECKBOX) {
                            response.isValid = response.isValid && value[input.propertyName] != null;
                        }
                        else if (!input.isDisabled) {
                            // Refletindo a validação do angular na resposta
                            response.isValid = response.isValid && input._inputFormControl.valid;
                        }

                        let applied = false;

                        if (value != null) {
                            const keys = Object.keys(value);
                            if (keys?.length > 0) {

                                if (keys[0].includes('_')) {
                                    const valueOfKey = Reflect.get(value, keys[0]);
                                    const objectValue = createObjectFromString(keys[0], valueOfKey, '_');

                                    if (this.config.isDebug) {
                                        console.log('adding objectValue into response data', objectValue);
                                    }

                                    // response.data = mergeClone(response.data, objectValue);
                                    response.data = { ...response.data, ...objectValue };

                                    applied = true;
                                }
                            }
                        }

                        if (!applied) {

                            if (this.config.isDebug) {
                                console.log('merging value into response data', value);
                            }

                            // response.data = mergeClone(response.data, value);
                            response.data = { ...response.data, ...value };
                        }

                        if (this.config.isDebug) {
                            console.log('>> response.data', response.data);
                        }

                    }
                }

            };
        };

        // console.log('response.isValid', response.isValid);
        this.isValid = response.isValid;

        const current = JSON.stringify(response.data).replace(/['"]+/g, '');

        // originalState está null aqui
        if (this.originalState === '') {
            this.originalState = current;
        }

        if (this.config.isDebug) {
            console.groupCollapsed('UpdateHasChanges');
            console.log('response', response);
            console.log('original', this.originalState);
            console.log('current', current);
            console.log('hasChanges', this.originalState !== current);
            console.groupEnd();
        }

        this.hasChanges = this.originalState !== current;

        response.hasUnsavedChanges = this.hasChanges;

        // console.log('Final isValid', this.isValid);

        return response;

    }

    /** Atualiza os valores dos inputs com seus dados default */
    public updateFormValues(updateValue = true): void {

        for (const group of this.config.groups) {
            for (const input of group.children) {
                const control = this.form.controls[input.propertyName];

                if (input.isDisabled) {
                    control.disable();
                }
                else {
                    control.enable();
                }

                if (updateValue) {
                    CONTROL_FUNCTIONS[input.type].updateValue(control, input);
                };
            };
        };

        this.form.markAsPristine();
        this.cdf.markForCheck();

    }

    public updateInputValue(property: string, newValue: any): void {

        var modified = false;

        this.config.groups.forEach(group => {
            group.children.forEach((input, index) => {
                if (input.propertyName === property) {
                    input.defaultValue = newValue;
                    const control = this.form.controls[input.propertyName];
                    CONTROL_FUNCTIONS[input.type].updateValue(control, input);
                    modified = true;
                }
            })
        });

        if (modified) {
            this.form.markAsPristine();
            this.cdf.markForCheck();
            this.getData();
        }
    }

    public updateInputConfig(property: string, overrides: Partial<SmzControlTypes>): void {

        var modified = false;

        this.config.groups.forEach(group => {
            group.children.forEach((input, index) => {
                if (input.propertyName === property) {
                    group.children[index] = { ...input, ...(overrides as any) };
                    modified = true;
                }
            })
        });

        if (modified) {
            this.updateFormValues(false);
            this.getData();
        }
    }
}
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SmzFormsManagerService } from '../services/smz-forms-manager.service';
import { CONTROL_FUNCTIONS } from './control-type-functions';
import { SmzControlType, SmzControlTypes, SmzTextButtonControl } from './control-types';
import { SmzForm, SmzFormsResponse } from './smz-forms';

export class SmzFormViewdata {
    public isValid: boolean = false;
    public hasChanges: boolean = false;

    constructor(
        public config: SmzForm<any>,
        public form: FormGroup,
        public manager: SmzFormsManagerService,
        public cdf: ChangeDetectorRef
    ) { }

    /** Retorna o objeto com os valores dos inputs; Esse objeto seguirá a nomemclatura do campo name de cada inputConfig */
    public getData<T>(): SmzFormsResponse<T> {
        // console.log('--------------------------');
        // console.log('--------------------------');
        // console.log('--------------------------');

        const data: T = {} as T;
        const response: SmzFormsResponse<T> = { data, isValid: true, hasUnsavedChanges: false };
        const formFlattenResponse = this.config.behaviors?.flattenResponse ?? false;

        for (const group of this.config.groups) {
            for (const input of group.children) {

                // console.log(`> ${input.propertyName}`, input);

                if (input.advancedSettings == null || !input.advancedSettings.excludeFromResponse) {
                    // console.log(1);
                    const value = CONTROL_FUNCTIONS[input.type].getValue(this.form, input, formFlattenResponse);

                    if (input.visibilityDependsOn == null || input.isVisible) {

                        if (input.isDisabled) {
                            // Forçando a validação para true porque o campo esta desabilitado
                            response.isValid = response.isValid && true; // this.manager.manuallyValidate(input, value);
                        }
                        else if (input.type === SmzControlType.TEXT_BUTTON) {
                            response.isValid = response.isValid && input._inputFormControl.valid && (input as SmzTextButtonControl).isButtonValid;
                        }
                        else if (!input.isDisabled) {
                            // Refletindo a validação do angular na resposta
                            response.isValid = response.isValid && input._inputFormControl.valid;
                        }

                        response.data = { ...response.data, ...value };
                    }
                }

            };
        };

        this.isValid = response.isValid;

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
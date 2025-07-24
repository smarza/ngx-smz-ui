import { SmzControlType } from './control-types';
import { AbstractControl } from '@angular/forms';
import { SmzFormsAdvancedSettings } from './advanced';
import { SmzTemplate } from '../../../common/models/templates';

export interface SmzFormsBaseControl
{
    readonly propertyName?: string;
    readonly type?: SmzControlType;
    advancedSettings?: SmzFormsAdvancedSettings;
    template?: SmzTemplate;
    isVisible?: boolean;
    isDisabled?: boolean;
    name?: string;
    validatorsPreset?: SmzFormsValidatorsPreset;
    visibilityDependsOn?: { propertyName: string, reversed: boolean, formId?: string, condition?: any, conditions?: any[] };
    visibilityFunction?: (formValues: any) => boolean;
    dataDependency?: { propertyName: string, condition: 'some' | 'none', matchValues: any[], callback: (control: SmzFormsBaseControl) => void }[]
    _inputFormControl?: AbstractControl;
    styleClass?: string;
    hideLabel?: boolean;
    forceIncludeInResponse?: boolean;
}

export interface SmzFormsValidatorsPreset
{
    isRequired?: Boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}
import { Validators, AsyncValidator, ValidatorFn } from '@angular/forms';

export interface ValidationMessage
{
    type: string;
    message: string;
}


export interface SmzFormsAdvancedSettings
{
    validators?: ValidatorFn[];
    validationMessages?: Array<ValidationMessage>;
    asyncValidators?: AsyncValidator[];
    excludeFromResponse?: boolean;
    propagationCallback?: (value: any) => void;
    isPropagating?: boolean;
    overrideResponseFormat?: 'flat' | 'object';
}
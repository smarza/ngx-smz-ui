import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions as SmzFormCustomFunctions } from './behaviors';
import { SmzControlTypes } from './control-types';
import { SmzTemplate } from '../../../common/models/templates';
import { Form, FormGroup } from '@angular/forms';

export interface SmzForm<T>
{
    _context?: SmzFormContext;
    formId?: string;
    behaviors?: SmzFormsBehaviorsConfig;
    functions?: SmzFormCustomFunctions<T>;
    groups: SmzFormGroup[];
    entryComponents?: ComponentData[];
    template?: SmzTemplate;

}

export interface SmzFormContext {
    applyGlobalStyles: boolean;
    form: FormGroup;
}

export interface SmzFormGroup
{
    readonly name: string;
    showName: Boolean;
    template?: SmzTemplate;
    children: SmzControlTypes[];
}

export interface SmzFormsResponse<T>
{
    data: T;
    isValid: boolean;
}
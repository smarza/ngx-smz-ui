import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions as SmzFormCustomFunctions } from './behaviors';
import { SmzControlTypes } from './control-types';
import { SmzTemplate } from '../../../common/models/templates';
import { Form, UntypedFormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export interface SmzForm<T>
{
    context?: SmzFormContext<T>;
    isDebug?: boolean;
    formId?: string;
    behaviors?: SmzFormsBehaviorsConfig;
    functions?: SmzFormCustomFunctions<T>;
    groups: SmzFormGroup[];
    entryComponents?: ComponentData[];
    template?: SmzTemplate;

}

export interface SmzFormContext<T> {
    applyGlobalStyles: boolean;
    form: UntypedFormGroup;
    cdf: ChangeDetectorRef;
    data: () => SmzFormsResponse<T>;
    valid: () => boolean;
}

export interface SmzFormGroup
{
    readonly key?: string;
    readonly name: string;
    isHide?: Boolean;
    showName: Boolean;
    template?: SmzTemplate;
    children: SmzControlTypes[];
}

export interface SmzFormsResponse<T>
{
    data: T;
    isValid: boolean;
    hasUnsavedChanges: boolean;
}

import { FormGroup } from '@angular/forms';
import { SmzFormsResponse, SmzForm } from './smz-forms';

export interface SmzFormsBehaviorsConfig
{
    avoidFocusOnLoad?: boolean;
    debounceTime?: number;
    runCustomFunctionsOnLoad?: boolean;
    skipFunctionAfterNextEmit?: boolean;
    skipEmitChangesOnLoad?: boolean;
    runStatusChangesOnConfigUpdate?: boolean;
    flattenResponse?: boolean;
    showErrorsMethod?: ShowErrorsMethodTypes;
    submitOnEnter?: boolean;
    updateOn?: 'blur' | 'change' | 'submit';
    showMultipleErrorMessages?: boolean;
}

export type ShowErrorsMethodTypes = 'touched' | 'pristine' | 'dirty';

export interface SmzFormsBehaviorsFunctions<T>
{
    customValidator?: (data: SmzFormsResponse<T>, form: FormGroup) => boolean
    customBehavior?: (data: SmzFormsResponse<T>, config: SmzForm<T>, form: FormGroup, outputEvents: {}) => void
}


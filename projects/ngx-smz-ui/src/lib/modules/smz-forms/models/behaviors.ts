
import { UntypedFormGroup } from '@angular/forms';
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

    // Splitting response by separator.
    // Any inputs with name containing this separator will be added as an object into the response data
    // Example:
    // splitResponseBySeparator: '_'
    // input1: PRESSURE_MONITOR
    // response: { PRESSURE: { MONITOR: [] } }
    nestedResponseKeySeparator?: string
}

export type ShowErrorsMethodTypes = 'touched' | 'pristine' | 'dirty';

export interface SmzFormsBehaviorsFunctions<T>
{
    customValidator?: (data: SmzFormsResponse<T>, form: UntypedFormGroup) => boolean
    customBehavior?: (data: SmzFormsResponse<T>, config: SmzForm<T>, form: UntypedFormGroup, outputEvents: {}) => void
}


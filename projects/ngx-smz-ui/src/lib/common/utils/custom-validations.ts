import { UntypedFormControl, FormGroup } from '@angular/forms';
import { replaceAll } from './utils';

// custom validator to check that two fields match
export function MustMatch(matchingControlName: string) {
    const normalizedMatchingControlName = replaceAll(matchingControlName, '.', '_');

    return (control: UntypedFormControl) => {
        const value = control.value;

        if (control.parent != null)
        {
            const matchingValue = control.parent.controls[normalizedMatchingControlName].value;

            if (matchingValue !== value)
            {
                return { 'mustmatch': true };
            }
        }

        return {};
    }
}

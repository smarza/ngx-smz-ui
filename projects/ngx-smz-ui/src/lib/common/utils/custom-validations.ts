import { FormControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(matchingControlName: string) {
    return (control: FormControl) => {
        const value = control.value;

        if (control.parent != null)
        {
            const matchingValue = control.parent.controls[matchingControlName].value;

            if (matchingValue !== value)
            {
                return { 'mustmatch': true };
            }
        }

        return {};
    }
}

import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzNumberControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-number',
    templateUrl: './input-number.component.html'
})
export class InputNumberComponent
{
    @Input() public input: SmzNumberControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    @Input() public form: UntypedFormGroup;
    constructor() { }

    public onInput(event: any) {
        // console.log('onInput', event);

        if (this.form.updateOn !== 'blur') {
            this.control.setValue(event.value);
            this.control.updateValueAndValidity();
        }
    }

}

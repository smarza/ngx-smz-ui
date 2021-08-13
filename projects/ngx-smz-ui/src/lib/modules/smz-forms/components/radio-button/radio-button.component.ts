import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzRadioControl } from '../../models/control-types';

@Component({
    selector: 'smz-radio-button',
    templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent
{
    @Input() public input: SmzRadioControl<any>;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
    constructor() { }

}

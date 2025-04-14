import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzCurrencyControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-currency',
    templateUrl: './input-currency.component.html',
    standalone: false
})
export class InputCurrencyComponent
{
    @Input() public input: SmzCurrencyControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }


}

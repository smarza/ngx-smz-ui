import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzPasswordControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-password',
    templateUrl: './input-password.component.html',
})
export class InputPasswordComponent
{
    @Input() public input: SmzPasswordControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

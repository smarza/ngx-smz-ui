import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzSwitchControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-switch',
    templateUrl: './input-switch.component.html',
    host: { class: 'grid grid-nogutter' }
})
export class InputSwitchComponent
{
    @Input() public input: SmzSwitchControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

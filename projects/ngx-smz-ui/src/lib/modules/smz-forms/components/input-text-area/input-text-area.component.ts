import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextAreaControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text-area',
    templateUrl: './input-text-area.component.html',
})
export class InputTextAreaComponent
{
    @Input() public input: SmzTextAreaControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

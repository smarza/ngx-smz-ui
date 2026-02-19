import { Component, ViewEncapsulation, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzMaskControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-mask',
    templateUrl: './input-mask.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class InputMaskComponent
{
    @Input() public input: SmzMaskControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

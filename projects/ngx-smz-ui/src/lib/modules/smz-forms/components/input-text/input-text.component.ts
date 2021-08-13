import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text',
    templateUrl: './input-text.component.html'
})
export class InputTextComponent
{
    @Input() public input: SmzTextControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor()
    {
    }

}

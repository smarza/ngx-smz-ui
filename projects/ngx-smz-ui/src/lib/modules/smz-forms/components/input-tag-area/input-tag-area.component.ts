import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTagAreaControl } from '../../models/control-types';

@Component({
    selector: 'input-tag-area',
    templateUrl: './input-tag-area.component.html',
    standalone: false
})
export class InputTagAreaComponent
{
    @Input() public input: SmzTagAreaControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor()
    {
    }

}

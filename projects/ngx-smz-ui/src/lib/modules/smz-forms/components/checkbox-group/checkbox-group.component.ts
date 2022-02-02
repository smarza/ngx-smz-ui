import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzCheckBoxGroupControl } from '../../models/control-types';

@Component({
    selector: 'smz-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    host: { class: 'grid grid-nogutter' }
})
export class CheckBoxGroupComponent
{
    @Input() public input: SmzCheckBoxGroupControl<any>;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }


}

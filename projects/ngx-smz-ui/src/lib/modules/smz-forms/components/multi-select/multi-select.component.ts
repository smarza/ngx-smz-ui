import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzMultiSelectControl } from '../../models/control-types';

@Component({
    selector: 'smz-multi-select',
    templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent
{
    @Input() public input: SmzMultiSelectControl<any>;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

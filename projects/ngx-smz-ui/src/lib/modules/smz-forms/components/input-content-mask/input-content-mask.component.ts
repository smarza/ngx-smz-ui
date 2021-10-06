import { Component, ViewEncapsulation, Input } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzContentMaskControl } from '../../models/control-types';

@Component({
    selector: 'smz-content-input-mask',
    templateUrl: './input-content-mask.component.html',
    encapsulation: ViewEncapsulation.None
})
export class InputContentMaskComponent
{
    @Input() public input: SmzContentMaskControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

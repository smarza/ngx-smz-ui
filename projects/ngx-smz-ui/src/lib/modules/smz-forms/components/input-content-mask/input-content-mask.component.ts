import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzContentMaskControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-content-mask',
    templateUrl: './input-content-mask.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputContentMaskComponent
{
    @Input() public input: SmzContentMaskControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

}

import { Component, Input } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextButtonControl } from '../../models/control-types';
import { SmzFormViewdata } from '../../models/form-viewdata';

@Component({
    selector: 'smz-input-text-button',
    templateUrl: './input-text-button.component.html'
})
export class InputTextButtonComponent
{
    @Input() public input: SmzTextButtonControl;
    @Input() public control: any;
    @Input() public viewdata: SmzFormViewdata
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor()
    {
    }

    public emit(): void {
        const data = this.viewdata.getData();
        this.input.callback(data, this.viewdata);
    }

}

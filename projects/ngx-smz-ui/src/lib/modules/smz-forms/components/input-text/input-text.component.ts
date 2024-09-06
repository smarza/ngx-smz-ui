import { Component, Input, OnInit } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text',
    templateUrl: './input-text.component.html'
})
export class InputTextComponent implements OnInit
{
    @Input() public input: SmzTextControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor()
    {
    }

    public ngOnInit(): void
    {
        console.log(this.input);
    }
}

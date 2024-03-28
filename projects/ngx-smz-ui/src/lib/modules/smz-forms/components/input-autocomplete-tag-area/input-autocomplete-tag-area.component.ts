import { Component, Input } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzAutocompleteTagAreaControl, SmzTagAreaControl } from '../../models/control-types';

@Component({
    selector: 'input-autocomplete-tag-area',
    templateUrl: './input-autocomplete-tag-area.component.html'
})
export class InputAutocompleteTagAreaComponent
{
    @Input() public input: SmzAutocompleteTagAreaControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor()
    {
    }

}

import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextButtonControl } from '../../models/control-types';
import { SmzFormViewdata } from '../../models/form-viewdata';

@UntilDestroy()
@Component({
    selector: 'smz-input-text-button',
    templateUrl: './input-text-button.component.html'
})
export class InputTextButtonComponent {
    @Input() public input: SmzTextButtonControl;
    @Input() public control: any;
    @Input() public viewdata: SmzFormViewdata
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public blocked = false;
    constructor() {
    }

    public emit(): void {
        const data = this.viewdata.getData();

        this.input.isButtonValid = false;
        this.input.buttonMessages = [];
        this.blocked = true;

        this.input
            .callback(data, this.viewdata)
            .pipe(take(1), untilDestroyed(this))
            .subscribe((event: { isValid: boolean, messages?: string[] }) => {
                this.input.isButtonValid = event.isValid;
                this.input.buttonMessages = event.messages != null ? event.messages : [];
                this.blocked = false;
            });

    }

}

import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, take, takeWhile } from 'rxjs';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextButtonControl } from '../../models/control-types';
import { SmzFormViewdata } from '../../models/form-viewdata';
import { AbstractControl } from '@angular/forms';

@UntilDestroy()
@Component({
    selector: 'smz-input-text-button',
    templateUrl: './input-text-button.component.html'
})
export class InputTextButtonComponent implements OnInit {
    @Input() public input: SmzTextButtonControl;
    @Input() public control: AbstractControl;
    @Input() public viewdata: SmzFormViewdata
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public blocked = false;
    constructor() {
    }

    public ngOnInit(): void {

        if (this.input.clearButtonMessageOnChanges) {
            this.control.statusChanges
            .pipe(debounceTime(this.viewdata.config.behaviors?.debounceTime ?? 400), untilDestroyed(this))
            .subscribe(() =>
            {
                this.input.buttonMessages = [];
            });
        }

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

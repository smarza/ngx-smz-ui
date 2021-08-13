import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessage } from '../../../smz-forms/models/advanced';

@Component({
    selector: 'smz-validation-messages',
    templateUrl: './validation-messages.component.html',
})
export class ValidationMessagesComponent implements OnInit
{
    @Input() public errors: ValidationErrors;
    @Input() public messages: ValidationMessage[];
    @Input() public isFormInvalid: boolean;
    @Input() public isFormDirty: boolean;

    constructor() { }

    public ngOnInit(): void
    {
    }

}

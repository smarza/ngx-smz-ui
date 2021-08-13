import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzControlTypes } from '../../models/control-types';

@Component({
    selector: 'smz-validation-messages',
    templateUrl: './validation-messages.component.html',
})
export class ValidationMessagesComponent implements OnInit
{
    @Input() public input: SmzControlTypes;
    @Input() public control: AbstractControl;
    @Input() public behaviors: SmzFormsBehaviorsConfig;

    constructor(public configuration: SmzDialogsConfig) { }

    public ngOnInit(): void
    {
    }

}

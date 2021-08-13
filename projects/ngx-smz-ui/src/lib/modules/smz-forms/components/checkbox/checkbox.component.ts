import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzCheckBoxControl } from '../../models/control-types';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';

@Component({
    selector: 'smz-checkbox',
    templateUrl: './checkbox.component.html',
})
export class CheckBoxComponent implements OnInit
{
    @Input() public input: SmzCheckBoxControl;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor(public formsService: SmzFormsVisibilityService, public dialogVisibility: SmzDialogsVisibilityService)
    {
    }

    public ngOnInit(): void
    {
        this.formsService.registryDependsOnData(this.input, this.formId);
    }

    public emitChange(input: SmzCheckBoxControl, formId: string, event: any): void
    {
        this.formsService.setValue(input, formId, event);
        this.dialogVisibility.setValue(input, formId, event);
    }
}

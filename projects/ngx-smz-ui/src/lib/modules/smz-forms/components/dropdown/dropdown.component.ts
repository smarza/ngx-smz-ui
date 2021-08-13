import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit
{
    @Input() public input: SmzDropDownControl<any>;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor(public dropdownService: SmzFormsDropdownService, public formsVisibility: SmzFormsVisibilityService, public dialogVisibility: SmzDialogsVisibilityService)
    {
    }

    public ngOnInit(): void
    {
        this.dropdownService.registryDependsOnData(this.input, this.formId);
        this.formsVisibility.registryDependsOnData(this.input, this.formId);
    }

    public emitChange(input: SmzDropDownControl<any>, formId: string, event: any): void
    {
        this.dropdownService.setValue(input, formId, event);
        this.dialogVisibility.setValue(input, formId, event);
        this.formsVisibility.setValue(input, formId, event);
    }


}

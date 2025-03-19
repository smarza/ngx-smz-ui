import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
    standalone: false
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

        if (this.input.defaultValue != null) {
            const option = this.input.options.find(x => x.id === this.input.defaultValue);

            if (option != null) {
                setTimeout(() => {
                    this.dropdownService.setValue(this.input, this.formId, { value : option, originalEvent: null });
                }, 0);
            }
        }
    }

    public emitChange(input: SmzDropDownControl<any>, formId: string, event: DropdownChangeEvent): void
    {
        this.dropdownService.setValue(input, formId, event);
        this.dialogVisibility.setValue(input, formId, event);
        this.formsVisibility.setValue(input, formId, event);
    }

}

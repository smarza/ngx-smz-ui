import { Component, Input } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzMultiSelectControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
    selector: 'smz-multi-select',
    templateUrl: './multi-select.component.html',
    standalone: false
})
export class MultiSelectComponent
{
    @Input() public input: SmzMultiSelectControl<any>;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor(public dropdownService: SmzFormsDropdownService, public formsVisibility: SmzFormsVisibilityService, public dialogVisibility: SmzDialogsVisibilityService)
    {
    }

    public ngOnInit(): void
    {
        this.formsVisibility.registryDependsOnData(this.input as any, this.formId);

        if (this.input.defaultValue != null) {
            const option = this.input.options.find(x => x.id === this.input.defaultValue);

            if (option != null) {
                setTimeout(() => {
                    this.dropdownService.setValue(this.input, this.formId, { value : option, originalEvent: null });
                }, 0);
            }
        }
    }

    public emitChange(input: SmzMultiSelectControl<any>, formId: string, event: MultiSelectChangeEvent): void
    {
        this.dropdownService.setValue(input, formId, event);
        this.dialogVisibility.setValue(input as any, formId, event);
        this.formsVisibility.setValue(input as any, formId, event);
    }

}

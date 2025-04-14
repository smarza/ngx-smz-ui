import { Component, Input } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzRadioControl } from '../../models/control-types';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { RadioButtonClickEvent } from 'primeng/radiobutton';

@Component({
    selector: 'smz-radio-button',
    templateUrl: './radio-button.component.html',
    host: { class: 'grid grid-nogutter' },
    standalone: false
})
export class RadioButtonComponent
{
    @Input() public input: SmzRadioControl<any>;
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

    public emitChange(input: SmzRadioControl<any>, formId: string, event: RadioButtonClickEvent): void
    {
        this.formsService.setValue(input, formId, event);
        this.dialogVisibility.setValue(input, formId, event);
    }

}

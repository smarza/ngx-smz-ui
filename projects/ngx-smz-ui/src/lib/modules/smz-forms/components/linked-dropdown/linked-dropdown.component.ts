import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzLinkedDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';

@Component({
    selector: 'smz-linked-dropdown',
    templateUrl: './linked-dropdown.component.html',
})
export class LinkedDropdownComponent implements OnInit
{
    @Input() public input: SmzLinkedDropDownControl<any>;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor(public service: SmzFormsDropdownService)
    {
    }

    public ngOnInit(): void
    {
        this.service.registryDependsOnData(this.input, this.formId);
        this.service.registryObserver(this.input, this.formId);
    }

}

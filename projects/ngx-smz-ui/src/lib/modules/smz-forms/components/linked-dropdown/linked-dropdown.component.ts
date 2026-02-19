import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzLinkedDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'smz-linked-dropdown',
    templateUrl: './linked-dropdown.component.html',
    standalone: false
})
export class LinkedDropdownComponent implements OnInit, AfterViewInit
{
    @Input() public input: SmzLinkedDropDownControl<any>;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;

    public options$: Observable<any>;
    constructor(public service: SmzFormsDropdownService)
    {

    }

    public ngOnInit(): void
    {
        this.service.registryDependsOnData(this.input, this.formId);
        this.service.registryObserver(this.input, this.formId);
    }

    public ngAfterViewInit(): void {
        this.options$ = this.service.observers[this.formId + this.input.propertyName]?.options
        .pipe(
            tap(options => {

                if (options?.length > 0 && this.input.defaultValue != null) {

                    if (this.input.defaultValue.id != null)
                    {
                        // Default value encontrado no formato SimpleEntity
                        setTimeout(() => {
                            this.control.patchValue(options.find(x => x.id === this.input.defaultValue.id));
                        }, 0);
                    }
                    else
                    {
                        // Default value encontrado no formato string
                        const value = options.find(x => x.id === this.input.defaultValue);
                        setTimeout(() => {
                            this.control.patchValue(value ?? '');
                        }, 0);
                    }

                }
            })
        );
    }

}

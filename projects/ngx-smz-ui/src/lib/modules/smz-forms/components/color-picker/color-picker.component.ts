import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzColorPickerControl } from '../../models/control-types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'smz-color-picker',
    templateUrl: './color-picker.component.html',
    standalone: false
})
export class ColorPickerComponent implements OnInit
{
    private readonly destroyRef = inject(DestroyRef);
    @Input() public input: SmzColorPickerControl;
    @Input() public control: UntypedFormControl;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public color: string;
    constructor() { }

    public ngOnInit(): void
    {
        this.color = this.control.value;

        this.control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
            // console.log('valueChanges >>>', event);

            if (event != this.color) {
                // console.log('changed');
                this.onPickerChange(event);
            }
        });
    }

    public onPickerChange(event: any): void
    {
        this.color = event;
    }

    public onInputChange(event: any): void
    {
        this.control.setValue(event);
    }

    public markAsTouched(): void
    {
        this.control.markAsTouched();
    }

}

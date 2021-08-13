import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzColorPickerControl } from '../../models/control-types';

@Component({
  selector: 'smz-color-picker',
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent implements OnInit
{
    @Input() public input: SmzColorPickerControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public color: string;
    constructor() { }

    public ngOnInit(): void
    {
        this.color = this.control.value;
    }

    public onPickerChange(event: any): void
    {
        // console.log('onPickerChange', event);
        this.color = event.value;
    }

    public onInputChange(event: any): void
    {
        console.log('onInputChange', event);
        this.control.setValue(event);
    }

    public markAsTouched(): void
    {
        this.control.markAsTouched();
    }

}

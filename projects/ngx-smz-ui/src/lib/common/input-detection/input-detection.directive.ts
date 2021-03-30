import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { isEqual } from 'lodash-es';
export interface InputChangeData {
    old: string;
    new: string;
}

@Directive({
    selector: '[appInputChangeDetection]'
})
export class InputChangeDetectionDirective
{
    @Output() public valueChanged: EventEmitter<InputChangeData> = new EventEmitter();

    @HostListener('focus') public focus(): void
    {
        this.value = this.el.nativeElement.value;
    }

    @HostListener('blur') public blur(): void
    {
        const newValue = this.el.nativeElement.value;

        if (!isEqual(this.value, newValue))
        {
            this.valueChanged.emit({ old: this.value, new: newValue });
        }
    }
    public value;
    constructor(private el: ElementRef)
    {

    }
}
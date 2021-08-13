import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[focusFirstInput]'
})
export class FormFocusFirstInputDirective implements AfterViewInit
{
    @Input() public focus: boolean;

    constructor(private el: ElementRef)
    {

    }

    public ngAfterViewInit(): void
    {
        if (!this.focus) return;

        const byClass = this.el.nativeElement.getElementsByClassName('smz__input_value');

        if (byClass == null) return;

        try
        {
            const inputs = Array.from(byClass);

            if (inputs.length === 0) return;

            const first = inputs[0] as any;

            if (first)
            {
                setTimeout(() =>
                {
                    first.focus();
                }, 0);
            }
        } catch (error)
        {

        }

    }

}

import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'smz-html-content',
    templateUrl: './html-content.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HtmlContentComponent
{
    @Input() public data: string;
    public isValid = true;

}

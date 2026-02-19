import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'smz-markdown-content',
    templateUrl: './markdown-content.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class MarkdownContentComponent
{
    @Input() public data: string;
    public isValid = true;

}

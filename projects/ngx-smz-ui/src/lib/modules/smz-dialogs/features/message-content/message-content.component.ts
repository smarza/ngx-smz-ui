import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'smz-message-content',
    templateUrl: './message-content.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class MessageContentComponent implements OnInit
{
    @Input() public data: string;
    public isValid = true;

    constructor()
    { }

    public ngOnInit(): void
    {
        // console.log('MessageContentComponent ngOnInit', this.data);
    }

}

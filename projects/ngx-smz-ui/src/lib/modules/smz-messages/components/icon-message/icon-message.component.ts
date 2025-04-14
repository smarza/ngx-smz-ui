import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'smz-icon-message',
    templateUrl: './icon-message.component.html',
    styleUrls: ['../../css/messages.css'],
    standalone: false
})
export class SmzIconMessageComponent implements OnInit
{
    @Input() public icon: string;
    @Input() public message: string;
    @Input() public comment: string;
    constructor() { }

    public ngOnInit(): void
    {
    }

}

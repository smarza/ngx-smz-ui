import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'smz-info-date',
    templateUrl: './smz-info-date.component.html',
    styleUrls: ['./smz-info-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmzInfoDateComponent implements OnInit
{
    @Input() public date: Date;
    @Input() public checkForDue = false;
    @Input() public checkForNew = false;
    @Input() public daysCount = 0;
    @Input() public format: 'shortDate' | 'short' = 'shortDate';

    constructor() { }

    public ngOnInit(): void
    {
    }

}

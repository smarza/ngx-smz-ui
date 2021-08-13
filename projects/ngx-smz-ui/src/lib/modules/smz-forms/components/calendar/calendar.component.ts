import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzCalendarControl } from '../../models/control-types';

@Component({
    selector: 'smz-calendar',
    templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit
{
    @Input() public input: SmzCalendarControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    constructor() { }

    public ngOnInit(): void
    {
    }

}

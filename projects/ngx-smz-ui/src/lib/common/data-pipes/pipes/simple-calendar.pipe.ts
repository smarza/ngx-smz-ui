import { Injectable, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'simpleCalendar'
})

@Injectable()
export class SimpleCalendarPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: Date, method: 'fromNow' | 'calendar'): any
    {
        switch (method)
        {
            case 'fromNow':
                return moment(data).fromNow();

            case 'calendar':
                return moment(data).calendar();

            default:
                return '-';
                break;
        }
        return
    }

}

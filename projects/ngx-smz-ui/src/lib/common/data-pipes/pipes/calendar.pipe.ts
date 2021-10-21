import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Pipe({
    name: 'calendar'
})

@Injectable()
export class CalendarPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: Date, method: 'fromNow' | 'calendar', days: number, format: string): any
    {
        const date = moment(data).set({ h: 0, m: 0, s: 0 });
        const comparison = moment().set({ h: 23, m: 59, s: 59 }).subtract(days, days > 1 ? 'days' : 'day');

        if (date > comparison) {
            switch (method)
            {
                case 'fromNow':
                    return moment(data).fromNow();

                case 'calendar':
                    return moment(data).calendar();

                default:
                    return '-';
            }
        }
        else {
            return moment(data).format(format);
        }

    }

}

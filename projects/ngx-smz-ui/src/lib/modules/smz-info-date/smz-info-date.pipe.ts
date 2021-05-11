import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

const moment = moment_;

@Pipe({
    name: 'smzInfoDate'
})
export class SmzInfoDatePipe implements PipeTransform
{
    public today = moment().format('YYYY-MM-DD');
    public transform(date: Date | string, newDaysCount = 0): any
    {

        if (date == null || date === '') return null;

        const input = new Date(date);
        const current = moment(input).format('YYYY-MM-DD');

        const isBetween = moment(current)
            .isBetween(
                moment().subtract(newDaysCount, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
                undefined,
                '[]'
            );

        const isPast = current < this.today;

        return { isPast, isBetween }
    }

}

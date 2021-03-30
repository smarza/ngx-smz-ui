import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';

@Pipe({
    name: 'describeArray'
})

@Injectable()
export class DescribeArrayPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: string[], separator: 'comma' | 'newline' = 'comma', max: number = null, empty = ''): any
    {
        if (data == null || data.length === 0) return empty;

        if (max != null && data.length === max) return 'Todos';

        const limit = max ?? 3;
        let separatorJoin = ', ';

        switch (separator)
        {
            case 'comma':
                separatorJoin = ', ';
                break;
            case 'newline':
                separatorJoin = '\n';
                break;
            default:
                break;
        }
        if (data.length > limit) return cloneDeep(data).slice(0, limit).map(x => x).join(separatorJoin) + ` e mais ${data.length - limit}...`;

        return data.map(x => x).join(separatorJoin);
    }

}

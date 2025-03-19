import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { SimpleNamedEntity } from '../../models/simple-named-entity';

@Pipe({
    name: 'describeSimpleNamed',
    standalone: false
})

@Injectable()
export class DescribeSimpleNamedPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: SimpleNamedEntity[], max: number): any
    {
        if (max != null && data.length === max) return 'Todos';

        const limit = max ?? 3;
        if (data.length > limit) return cloneDeep(data).slice(0, limit).map(x => x.name).join(', ') + ` e mais ${data.length - limit}...`;

        return data.map(x => x.name).join(', ');
    }

}

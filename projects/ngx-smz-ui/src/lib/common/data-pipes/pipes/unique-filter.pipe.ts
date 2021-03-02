import { Injectable, Pipe, PipeTransform } from '@angular/core';
import uniqBy from 'lodash-es/uniqBy';
import { sortArray } from '../../utils/utils';

@Pipe({
    name: 'uniqueFilter'
})

@Injectable()
export class UniqueFilterPipe implements PipeTransform
{
    constructor() { }
    public transform(items: any[], args: any[] | string, reMap: string = null, initial: any = null, sortBy: string = null): any
    {
        // console.log('------ uniqueFilter');
        // console.log(items, args, reMap);
        // EXEMPLO DE USO
        // [options]="items | uniqueFilter : 'status.id' : 'status'"

        // filtra os items com base nos critérios args
        // args, pode conter propriedades compostas como ex: 'status.id'
        // args, pode conter multiplos critérios
        const uniques = uniqBy(items.filter(i => Reflect.get(i, reMap) != null), args);
        // console.log('uniques', uniques);
        if (reMap != null)
        {
            // retorna a lista contendo apenas a propriedade solicitada

            const results = uniques.map(u => (Reflect.get(u, reMap)));

            const afterSort = sortBy != null ? sortArray(results, sortBy) : results;
            // console.log('afterSort', afterSort);
            // console.log('result', initial != null ? [initial, ...afterSort] : afterSort);
            return initial != null ? [initial, ...afterSort] : afterSort;
        }
        else
        {
            // retorna a lista única com a mesma estrutura original

            const results = uniqBy(items, args);
            const afterSort = sortBy != null ? sortArray(results, sortBy) : results;
            // console.log('result', initial != null ? [initial, ...afterSort] : afterSort);
            return initial != null ? [initial, ...afterSort] : afterSort;
        }
    }

}

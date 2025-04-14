import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { uniqBy, flatten } from 'lodash-es';
import { isArray, sortArray, sortArrayOfStrings } from '../../utils/utils';

@Pipe({
    name: 'uniqueFilter',
    standalone: false
})

@Injectable()
export class UniqueFilterPipe implements PipeTransform
{
    constructor() { }
    public transform(items: any[], args: any[] | string, reMap: string = null, initial: any = null, sortBy: string | boolean = null, isManyToMany: boolean = false, isArrayOfObject: boolean = true): any
    {
        // console.log('------ uniqueFilter');
        // console.log(items, args, reMap);

        // EXEMPLO DE USO
        // [options]="items | uniqueFilter : 'status.id' : 'status'"

        // filtra os items com base nos critérios args
        // args, pode conter propriedades compostas como ex: 'status.id'
        // args, pode conter multiplos critérios

        // console.log('uniques', uniques);
        if (reMap != null && !isManyToMany)
        {
            // console.log(1);
            // retorna a lista contendo apenas a propriedade solicitada

            const uniques = uniqBy(items.filter(i => Reflect.get(i, reMap) != null), args);
            // console.log('uniques', uniques);
            const results = uniques.map(u => (Reflect.get(u, reMap)));
            // console.log('results', results);
            const afterSort = sortBy != null ? isArrayOfObject ? sortArray(results, sortBy as string) : sortArrayOfStrings(results) : results;
            // console.log('afterSort', afterSort);
            // console.log('result 1', initial != null ? [initial, ...afterSort] : afterSort);
            return initial != null ? [initial, ...afterSort] : afterSort;
        }
        else if (reMap != null && isManyToMany)
        {
            // retorna a lista contendo apenas a propriedade solicitada

            const mapped = items.map(u => (Reflect.get(u, reMap)));
            // console.log('mapped', mapped);
            const flat = flatten(mapped);

            const uniques = uniqBy(flat, 'id');
            // console.log('uniques', uniques);
            const results = uniques;
            // console.log('results', results);
            const afterSort = sortBy != null ? isArrayOfObject ? sortArray(results, sortBy as string) : sortArrayOfStrings(results) : results;
            return initial != null ? [initial, ...afterSort] : afterSort;
        }
        else
        {
            // retorna a lista única com a mesma estrutura original

            const results = uniqBy(items, args);
            const afterSort = sortBy != null ? isArrayOfObject ? sortArray(results, sortBy as string) : sortArrayOfStrings(results) : results;
            // console.log('result 2', initial != null ? [initial, ...afterSort] : afterSort);
            return initial != null ? [initial, ...afterSort] : afterSort;
        }
    }

}

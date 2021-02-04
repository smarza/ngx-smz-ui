import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Pipe({
    name: 'hierarchy'
})

@Injectable()
export class HierarchyPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(item: MenuItem): boolean
    {
        if (item.items == null || item.items.length === 0) return false;
        const some = item.items.every(x => (x.items != null && x.items.length > 0 ));

        console.log(item, some);
        return some;
    }

}

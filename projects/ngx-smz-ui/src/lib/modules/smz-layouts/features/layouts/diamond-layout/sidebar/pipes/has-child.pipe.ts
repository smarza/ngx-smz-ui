import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Pipe({
    name: 'hasChild'
})

@Injectable()
export class HasChildPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(item: MenuItem): boolean
    {
        let result = true;

        if (item.items == null || item.items.length === 0) result = false;

        console.log('hasChild ?', item, result);

        return result;
    }

}

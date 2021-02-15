import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash-es';
@Pipe({
 name: 'clone'
})

@Injectable()
export class ClonePipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: any): any
    {
        return cloneDeep(data);
    }

}

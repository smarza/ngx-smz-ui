import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})

@Injectable()
export class JoinPipe implements PipeTransform
{
    constructor() { }
    public transform<T>(...arrays: T[]): any[]
    {
        return [].concat(...arrays);
    }

}

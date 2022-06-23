import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';
import { isEmpty } from '../../../builders/common/utils';

@Pipe({ name: 'serverPath' })
export class ServerPathPipe implements PipeTransform
{
    constructor() { }
    transform(url: string, placeholder?: string)
    {
        const placeholderPath = placeholder ?? `assets/images/placeholder.jpeg`;

        if (isEmpty(url))
            return placeholderPath;

        console.log('environment', environment);
        console.log('environment.serverUrl', environment.serverUrl);
        return `${environment.serverUrl}/${url}`
    }
}
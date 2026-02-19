import { inject, Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '../../../builders/common/utils';
import { SmzEnvironment } from '../../../config';

@Pipe({
    name: 'serverPath',
    standalone: false
})
export class ServerPathPipe implements PipeTransform
{
  private readonly environment = inject(SmzEnvironment);

    constructor() { }
    transform(url: string, placeholder?: string)
    {
        const placeholderPath = placeholder ?? `assets/images/placeholder.jpeg`;

        if (isEmpty(url))
            return placeholderPath;

        if (this.environment.serverUrl == null) {
            throw Error("ServerPathPipe needs a property named 'serverUrl' on environment constant");
        }

        return `${this.environment.serverUrl}/${url}`;
    }

}
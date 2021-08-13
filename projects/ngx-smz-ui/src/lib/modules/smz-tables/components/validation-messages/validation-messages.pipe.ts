import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationMessage } from '../../../smz-forms/models/advanced';

@Pipe({
    name: 'validationMessages',
    pure: false
})

@Injectable()
export class ValidationMessagesPipe implements PipeTransform
{
    constructor() {

    }
    public transform(errors: ValidationErrors, messages: ValidationMessage[]): string
    {
        if (errors == null) return null;

        const result: string[] = [];

        for (let error of Object.keys(errors))
        {
            const match = messages.find(x => x.type === error);

            if (match != null)
            {
                result.push(match.message);
            }
            else
            {
                result.push(`Erro desconhecido: ${error}`);
            }
        }

        return result.length > 0 ? result[0] : null;
    }
}

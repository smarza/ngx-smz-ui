import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '../../rbk-utils/utils/utils';


@Pipe({
    name: 'highlight'
})

export class HighlightSearch implements PipeTransform
{

    transform(value: any, keywords: string): any
    {
        if (!keywords || keywords === '') { return value; }

        const words = keywords.split(' ').map(x => x.toLowerCase());
        let result = value;

        for (let word of words.filter(x => !isEmpty(x) && x.length > 2))
        {
            const re = new RegExp(word, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
            result = result.replace(re, "<mark>$&</mark>");
        }

        return result;
    }
}
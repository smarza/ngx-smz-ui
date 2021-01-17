import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { FaqDetails } from '../models/faqs';
import { deepClone, isEmpty } from 'ngx-rbk-utils';

@Pipe({
    name: 'searchFaqs'
})

@Injectable()
export class SearchFaqsPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(items: FaqDetails[], keywords: string): any
    {
        // console.log('searchFaqs');
        // console.log('items', items);

        if (isEmpty(keywords)) return deepClone(items);

        const words = keywords.split(' ').map(x => x.toLowerCase());

        let filtered = deepClone(items);

        for (let word of words.filter(x => !isEmpty(x) && x.length > 2))
        {
            filtered = filtered.filter(x =>
                x.question.toLowerCase().includes(word) ||
                x.answer.toLowerCase().includes(word)
            );
        }

        if (filtered.length === 1)
        {
            filtered[0] = { ...filtered[0], metadata: { selected: true } } as any;
        }

        // console.log('filtered', deepClone(filtered));
        return filtered;
    }

}

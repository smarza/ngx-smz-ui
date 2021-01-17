import { Selector, createSelector } from '@ngxs/store';
import { FaqsDbState, FaqsDbStateModel } from './faqs.state';
import { DbData, FaqDetails } from '../models/faqs';
import { deepClone } from 'ngx-rbk-utils';

// @dynamic
export class FaqsDbSelector
{
    public static all(id: string): any
    {
        return createSelector([FaqsDbState], (state: FaqsDbStateModel) =>
        {

            const match = state.data[id];

            if (match != null)
            {
                return deepClone(match);
            }
            else
            {
                return {
                    items: [],
                    lastUpdated: new Date()
                } as DbData<FaqDetails[]>;
            }

        });
    }

}

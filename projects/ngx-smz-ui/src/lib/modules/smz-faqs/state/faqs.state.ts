import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FaqsDbActions } from './faqs.actions';
import { isWithinTime, deepClone, } from 'ngx-rbk-utils';
import { DbData, FaqDetails } from '../models/faqs';
import { FaqsApiService } from '../services/faqs-api.service';
import { SmzFaqsConfig } from '../smz-faqs.config';
import { replaceItem } from 'ngx-smz-dialogs';


export interface FaqsDbStateModel
{
    data: { [key: string]: DbData<FaqDetails[]> };
}

export const getInitialState = (): FaqsDbStateModel => ({
    data: {}
});

// @dynamic
@State<FaqsDbStateModel>({
    name: 'faqs',
    defaults: getInitialState()
})

@Injectable()
export class FaqsDbState
{
    constructor(private apiService: FaqsApiService, private config: SmzFaqsConfig) { }

    @Action(FaqsDbActions.LoadAll)
    public onLoadAll$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.LoadAll): Observable<FaqDetails[]>
    {
        const data = ctx.getState().data[action.tag];
        const cacheTime = action.forceUpdate ? 0 : this.config.databaseCacheTimeout;

        if (data == null || !isWithinTime(data.lastUpdated, cacheTime))
        {

            return this.apiService.all(action.tag).pipe(
                tap((result: FaqDetails[]) =>
                {
                    ctx.dispatch(new FaqsDbActions.LoadAllSuccess(action.tag, result));
                })
            );
        }

    }

    @Action(FaqsDbActions.LoadAllSuccess)
    public onLoadAllSuccess(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.LoadAllSuccess): void
    {
        const faqs = deepClone(ctx.getState().data);

        faqs[action.tag] = {
            lastUpdated: new Date(),
            items: action.items,
        };

        ctx.patchState({ data: faqs });
    }


    @Action(FaqsDbActions.Create)
    public create$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.Create): Observable<FaqDetails>
    {
        return this.apiService.create(action.data).pipe(
            tap((result: FaqDetails) =>
                ctx.dispatch(new FaqsDbActions.CreateSuccess(result, action.data.tag)))
        );
    }

    @Action(FaqsDbActions.Delete)
    public delete$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.Delete): Observable<void>
    {
        return this.apiService.delete(action.id).pipe(
            tap(() =>
                ctx.dispatch(new FaqsDbActions.DeleteSuccess(action.id, action.tag)))
        );
    }

    @Action(FaqsDbActions.Update)
    public update$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.Update): Observable<FaqDetails>
    {
        return this.apiService.update(action.data).pipe(
            tap((result: FaqDetails) =>
                ctx.dispatch(new FaqsDbActions.UpdateSuccess(result, action.data.tag)))
        );
    }

    @Action(FaqsDbActions.CreateSuccess)
    public createSuccess$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.CreateSuccess): void
    {
        const faqs = deepClone(ctx.getState().data);

        faqs[action.tag] = {
            lastUpdated: new Date(),
            items: [action.data, ...faqs[action.tag].items],
        };

        ctx.patchState({
            data: faqs
        });
    }

    @Action(FaqsDbActions.DeleteSuccess)
    public deleteSuccess$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.DeleteSuccess): void
    {
        const faqs = deepClone(ctx.getState().data);

        faqs[action.tag] = {
            lastUpdated: new Date(),
            items: faqs[action.tag].items.filter(x => x.id !== action.id),
        };

        ctx.patchState({
            data: faqs
        });
    }

    @Action(FaqsDbActions.UpdateSuccess)
    public updateSuccess$(ctx: StateContext<FaqsDbStateModel>, action: FaqsDbActions.UpdateSuccess): void
    {

        const faqs = deepClone(ctx.getState().data);

        faqs[action.tag] = {
            lastUpdated: new Date(),
            items: replaceItem(faqs[action.tag].items, action.data),
        };

        ctx.patchState({
            data: faqs
        });

    }
}

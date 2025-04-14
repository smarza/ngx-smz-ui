import { Injectable } from '@angular/core';
import { ShopsDbActions } from './shops.actions';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopsService } from '../../../services/shops.service';
import { ShopDetails, ShopListItem } from '../../../models/shop';

export const ShopsDbName = 'shops';

export interface ShopsDbStateModel
{
    items: ShopListItem[];
    lastUpdated: Date | null;
    current: ShopDetails;
}

export const getDbShopsInitialState = (): ShopsDbStateModel => ({
    items: [],
    lastUpdated: null,
    current: null
});

@State<ShopsDbStateModel>({
    name: ShopsDbName,
    defaults: getDbShopsInitialState()
})
@Injectable()
export class ShopsDbState
{

    constructor(private apiService: ShopsService, private store: Store) { }

    @Action(ShopsDbActions.LoadAll)
    public onLoadAll$(ctx: StateContext<ShopsDbStateModel>, action: ShopsDbActions.LoadAll): Observable<ShopDetails[]>
    {
        return this.apiService.all(action.loaderOverride).pipe(
            tap((result: ShopDetails[]) => ctx.dispatch(new ShopsDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(ShopsDbActions.LoadAllSuccess)
    public onLoadAllSuccess(ctx: StateContext<ShopsDbStateModel>, action: ShopsDbActions.LoadAllSuccess): void
    {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }


    @Action(ShopsDbActions.LoadDetails)
    public onLoadDetails$(ctx: StateContext<ShopsDbStateModel>, action: ShopsDbActions.LoadDetails): Observable<ShopDetails>
    {
        return this.apiService.details(action.data.id).pipe(
            tap((result: any) =>
            {
                ctx.patchState({ current: result });
            })
        );
    }


}
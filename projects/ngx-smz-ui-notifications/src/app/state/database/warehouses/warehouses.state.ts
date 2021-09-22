import { Injectable } from '@angular/core';
import { WarehousesDbActions } from './warehouses.actions';
import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Warehouse } from '@models/warehouse';
import { WarehousesService } from '@services/warehouses.service';

export const WarehousesDbName = 'warehouses';

export interface WarehousesDbStateModel
{
    items: Warehouse[];
    lastUpdated: Date | null;
}

export const getInitialState = (): WarehousesDbStateModel => ({
    items: [],
    lastUpdated: null
});

@State<WarehousesDbStateModel>({
    name: WarehousesDbName,
    defaults: getInitialState()
})
@Injectable()
export class WarehousesDbState
{

    constructor(private apiService: WarehousesService) { }

    @Action(WarehousesDbActions.LoadAll)
    public onLoadAll$(ctx: StateContext<WarehousesDbStateModel>, action: WarehousesDbActions.LoadAll): Observable<Warehouse[]>
    {
        return this.apiService.all(action.loaderOverride).pipe(
            tap((result: Warehouse[]) => ctx.dispatch(new WarehousesDbActions.LoadAllSuccess(result)))
        );
    }

    @Action(WarehousesDbActions.LoadAllSuccess)
    public onLoadAllSuccess(ctx: StateContext<WarehousesDbStateModel>, action: WarehousesDbActions.LoadAllSuccess): void
    {
        ctx.patchState({
            items: action.data,
            lastUpdated: new Date()
        });
    }

}
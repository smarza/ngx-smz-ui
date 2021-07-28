import { Selector, createSelector } from '@ngxs/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { Warehouse } from 'projects/ngx-smz-ui-demo/src/app/models/warehouse';
import { WarehousesDbState, WarehousesDbStateModel } from './warehouses.state';

export class WarehousesDbSelectors
{

    @Selector([WarehousesDbState])
    public static all(db: WarehousesDbStateModel): Warehouse[]
    {
        return cloneDeep(db.items);
    }

    @Selector([WarehousesDbState])
    public static allActive(db: WarehousesDbStateModel): Warehouse[]
    {
        return cloneDeep(db.items.filter(i => i.isActive));
    }

    @Selector([WarehousesDbState])
    public static storages(db: WarehousesDbStateModel): Warehouse[]
    {
        return cloneDeep(db.items.filter(x => !x.isShowroom));
    }

    @Selector([WarehousesDbState])
    public static showrooms(db: WarehousesDbStateModel): Warehouse[]
    {
        return cloneDeep(db.items.filter(x => x.isShowroom));
    }

    public static single(id: string): any
    {
        return createSelector([WarehousesDbState], (state: WarehousesDbStateModel) =>
        {
            return id == null ? null : cloneDeep(state.items.find(x => x.id === id));
        });
    }

}
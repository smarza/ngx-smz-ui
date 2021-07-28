import { Selector, createSelector } from '@ngxs/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { ShopsDbState, ShopsDbStateModel } from './shops.state';
import { ShopDetails, ShopListItem } from 'imports/model.imports';
import { AppStateModel } from '../../app.state';

export class ShopsDbSelectors
{

    @Selector([ShopsDbState])
    public static all(db: ShopsDbStateModel): ShopListItem[]
    {
        return cloneDeep(db.items);
    }

    @Selector([ShopsDbState])
    public static allActive(db: ShopsDbStateModel): ShopListItem[]
    {
        return cloneDeep(db.items.filter(i => i.isActive));
    }

    public static single(id: string): any
    {
        return createSelector([ShopsDbState], (state: ShopsDbStateModel) =>
        {
            return id == null ? null : state.items.find(x => x.id === id);
        });
    }

    public static shopsBySupervisor(employeeId: string): any
    {
        return createSelector([ShopsDbState], (state: ShopsDbStateModel) =>
        {
            return employeeId == null ? null : state.items.find(x => x.supervisor.id === employeeId);
        });
    }

}
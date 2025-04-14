import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { RouterParamsActions } from './router-params.actions';
import { cloneDeep } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';

export interface RouterParamsStateModel
{
    params: { [key: string]: any };
    queryParams: any
}

export const getInitialState = (): RouterParamsStateModel => ({
    params: {},
    queryParams: {}
});

// @dynamic
@State<RouterParamsStateModel>({
    name: 'routerParams',
    defaults: getInitialState()
})

@Injectable()
export class RouterParamsState
{
    constructor(private route: ActivatedRoute, private store: Store) {
    this.route.queryParams.subscribe(
        params => {
            store.dispatch(new RouterParamsActions.UpdateQueryParams(params));
        }
        );
    }

    @Action(RouterParamsActions.Update)
    public onUpdate(ctx: StateContext<RouterParamsStateModel>, action: RouterParamsActions.Update): void
    {
        const params = cloneDeep(ctx.getState().params);
        params[action.key] = cloneDeep(action.data);
        ctx.patchState({ params });
    }

    @Action(RouterParamsActions.UpdateQueryParams)
    public onUpdateQueryParams(ctx: StateContext<RouterParamsStateModel>, action: RouterParamsActions.UpdateQueryParams): void
    {
        ctx.patchState({ queryParams: action.data });
    }
}
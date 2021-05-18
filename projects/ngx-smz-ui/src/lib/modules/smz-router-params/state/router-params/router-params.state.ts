import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { RouterParamsActions } from './router-params.actions';
import { cloneDeep } from 'lodash-es';

export interface RouterParamsStateModel
{
    params: { [key: string]: any };
}

export const getInitialState = (): RouterParamsStateModel => ({
    params: {}
});

// @dynamic
@State<RouterParamsStateModel>({
    name: 'routerParams',
    defaults: getInitialState()
})

@Injectable()
export class RouterParamsState
{
    constructor() { }

    @Action(RouterParamsActions.Update)
    public onUpdate(ctx: StateContext<RouterParamsStateModel>, action: RouterParamsActions.Update): void
    {
        const params = cloneDeep(ctx.getState().params);

        params[action.key] = cloneDeep(action.data);

        ctx.patchState({ params });
    }

}
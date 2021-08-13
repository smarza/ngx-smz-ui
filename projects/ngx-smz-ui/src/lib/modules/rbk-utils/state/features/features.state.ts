import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';

export const FEATURE_STATES = [];

@State({
    name: 'features',
    defaults: {},
    children: FEATURE_STATES
})
@Injectable()
export class FeaturesState {
    constructor(private rbkConfig: NgxRbkUtilsConfig) {}

    @Action(FeaturesActions.Clear)
    public clear(ctx: StateContext<any>): void {
        const newState = {};

        for (const stateConfig of Object.keys(this.rbkConfig.state.feature)) {
            newState[stateConfig] = this.rbkConfig.state.feature[stateConfig].clearFunction();
        }

        ctx.patchState(newState);
    }

    @Action(FeaturesActions.Restore)
    public restore(ctx: StateContext<any>): void {
        ctx.patchState({
            ...ctx.getState()
        });
    }
}
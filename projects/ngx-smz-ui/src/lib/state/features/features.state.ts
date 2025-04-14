import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';
import { GlobalInjector } from '../../common/services/global-injector';

export const FEATURE_STATES = [];

@State({
    name: 'features',
    defaults: {},
    children: FEATURE_STATES
})
@Injectable()
export class FeaturesState {
    constructor() {}

    @Action(FeaturesActions.Clear)
    public clear(ctx: StateContext<any>): void {
        const newState = {};

        for (const stateConfig of Object.keys(GlobalInjector.config.rbkUtils.state.feature)) {
            if (GlobalInjector.config.rbkUtils.state.feature[stateConfig].clearFunction != null) {
                newState[stateConfig] = GlobalInjector.config.rbkUtils.state.feature[stateConfig].clearFunction();
            }
            if (GlobalInjector.config.rbkUtils.state.feature[stateConfig].clearAction != null) {
                ctx.dispatch(GlobalInjector.config.rbkUtils.state.feature[stateConfig].clearAction);
            }
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
import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FeaturesActions } from './features.actions';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';

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

        for (const stateConfig of Object.keys(this.rbkConfig.state.database)) {
            if (this.rbkConfig.state.feature[stateConfig].clearFunction != null) {
                newState[stateConfig] = this.rbkConfig.state.feature[stateConfig].clearFunction();
            }
            if (this.rbkConfig.state.feature[stateConfig].clearAction != null) {
                ctx.dispatch(this.rbkConfig.state.feature[stateConfig].clearAction);
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
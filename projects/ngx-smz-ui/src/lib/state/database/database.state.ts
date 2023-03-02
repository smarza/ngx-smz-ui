import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatabaseActions } from './database.actions';
import { GlobalInjector } from '../../common/services/global-injector';

export const DATABASE_STATES: any[] = [];

export const DATABASE_REQUIRED_ACTIONS = [];

@State({
    name: 'database',
    defaults: {},
    children: DATABASE_STATES
})
@Injectable()
export class DatabaseState {
    constructor() { }

    @Action(DatabaseActions.Clear)
    public clear(ctx: StateContext<any>): void {
        const newState = {};

        for (const stateConfig of Object.keys(GlobalInjector.config.rbkUtils.state.database)) {
            if (GlobalInjector.config.rbkUtils.state.database[stateConfig].clearFunction != null) {
                newState[stateConfig] = GlobalInjector.config.rbkUtils.state.database[stateConfig].clearFunction();
            }
            if (GlobalInjector.config.rbkUtils.state.database[stateConfig].clearAction != null) {
                ctx.dispatch(GlobalInjector.config.rbkUtils.state.database[stateConfig].clearAction);
            }
        }

        ctx.patchState(newState);
    }

    @Action(DatabaseActions.Restore)
    public restore(ctx: StateContext<any>): void {
        ctx.patchState({
            ...ctx.getState()
        });
    }
}
import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatabaseActions } from './database.actions';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';

export const DATABASE_STATES: any[] = [];

export const DATABASE_REQUIRED_ACTIONS = [];

@State({
    name: 'database',
    defaults: {},
    children: DATABASE_STATES
})
@Injectable()
export class DatabaseState {
    constructor(private rbkConfig: NgxRbkUtilsConfig) { }

    @Action(DatabaseActions.Clear)
    public clear(ctx: StateContext<any>): void {
        const newState = {};

        for (const stateConfig of Object.keys(this.rbkConfig.state.database)) {
            if (this.rbkConfig.state.database[stateConfig].clearFunction != null) {
                newState[stateConfig] = this.rbkConfig.state.database[stateConfig].clearFunction();
            }
            if (this.rbkConfig.state.database[stateConfig].clearAction != null) {
                ctx.dispatch(this.rbkConfig.state.database[stateConfig].clearAction);
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
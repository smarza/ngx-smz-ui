import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DatabaseActions } from './database.actions';
import { NgxRbkUtilsConfig } from '../../ngx-rbk-utils.config';

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
            newState[stateConfig] = this.rbkConfig.state.database[stateConfig].clearFunction();
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
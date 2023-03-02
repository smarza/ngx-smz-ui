import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UiActions } from './ui.actions';
import { NotificationsUiState } from './notifications/notifications.state';
import { LayoutUiState } from './layout/layout.state';
import { RouterParamsState } from '../../modules/smz-router-params/state/router-params/router-params.state';
import { CommentsUiState } from './comments/comments.state';
import { ExcelsUiState } from './excels/excels.state';


export const UI_STATES: any[] = [LayoutUiState, NotificationsUiState, RouterParamsState, CommentsUiState, ExcelsUiState];

export const UI_REQUIRED_ACTIONS = [];

@State({
    name: 'ui',
    defaults: {},
    children: UI_STATES
})
@Injectable()
export class UiState {
    constructor() { }

    @Action(UiActions.Clear)
    public clear(ctx: StateContext<any>): void {

    }

    @Action(UiActions.Restore)
    public restore(ctx: StateContext<any>): void {
        ctx.patchState({
            ...ctx.getState()
        });
    }
}
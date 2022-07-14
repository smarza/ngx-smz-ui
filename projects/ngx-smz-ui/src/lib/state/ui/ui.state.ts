import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UiActions } from './ui.actions';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { NotificationsUiState } from './notifications/notifications.state';
import { LayoutUiState } from './layout/layout.state';
import { RouterParamsState } from '../../modules/smz-router-params/state/router-params/router-params.state';
import { CommentsUiState } from './comments/comments.state';


export const UI_STATES: any[] = [LayoutUiState, NotificationsUiState, RouterParamsState, CommentsUiState];

export const UI_REQUIRED_ACTIONS = [];

@State({
    name: 'ui',
    defaults: {},
    children: UI_STATES
})
@Injectable()
export class UiState {
    constructor(private rbkConfig: NgxRbkUtilsConfig) { }

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
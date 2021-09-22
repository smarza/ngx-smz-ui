import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { NotificationsUiActions } from './notifications.actions';
import { UiNotificationsService } from './notifications.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';

export const NOTIFICATIONS_STATE_NAME = 'notifications';

export interface NotificationsUiStateModel {
    lastUpdated: Date;
    data: {[key: string]: FormDefinitionData};
}

export const getInitialState = (): NotificationsUiStateModel => ({
        lastUpdated: null,
        data: null
    });

// @dynamic
@State<NotificationsUiStateModel>({
    name: NOTIFICATIONS_STATE_NAME,
    defaults: getInitialState()
})
@Injectable()
export class NotificationsUiState {
    constructor(private apiService: UiNotificationsService) { }

    @Action(NotificationsUiActions.LoadAll)
    public loadAll(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.LoadAll): Observable<any[]> {
        return this.apiService.all().pipe(
            tap((result: any) => ctx.patchState({
                data: result,
                lastUpdated: new Date()
            }))
        );
    }
}
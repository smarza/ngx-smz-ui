import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { NotificationsUiActions } from './notifications.actions';
import { UiNotificationsService } from './notifications.service';
import { Observable } from 'rxjs';
import { NotificationData, NotificationDeleteRequest, NotificationStatus, NotificationUpdateRequest } from './notifications.model';

export const NOTIFICATIONS_STATE_NAME = 'notifications';

export interface NotificationsUiStateModel {
    lastUpdated: Date;
    items: NotificationData[];
    hasRuningRequest: boolean;
}

export const getInitialState = (): NotificationsUiStateModel => ({
    lastUpdated: null,
    items: null,
    hasRuningRequest: false
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
    public onLoadAll$(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.LoadAll): Observable<NotificationData[]> {
        ctx.patchState({ hasRuningRequest: true });
        return this.apiService.all(action.data).pipe(
            tap((result) => ctx.patchState({
                items: result,
                lastUpdated: new Date(),
                hasRuningRequest: false
            }))
        );
    }

    @Action(NotificationsUiActions.MarkAsViewed)
    public onMarkAsViewed$(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.MarkAsViewed): Observable<void> {
        ctx.patchState({ hasRuningRequest: true });
        const newStatus = NotificationStatus.VIEWED;

        const updateData: NotificationUpdateRequest = {
            notificationIds: action.ids,
            status: newStatus
        };

        return this.apiService.update(updateData).pipe(
            tap(() => ctx.patchState({
                items: changeStatus(ctx.getState().items, action.ids, newStatus),
                lastUpdated: new Date(),
                hasRuningRequest: false
            }))
        );
    }

    @Action(NotificationsUiActions.Archive)
    public onArchive$(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.Archive): Observable<void> {
        ctx.patchState({ hasRuningRequest: true });
        const newStatus = NotificationStatus.ARCHIVED;

        const updateData: NotificationUpdateRequest = {
            notificationIds: action.ids,
            status: newStatus
        };

        return this.apiService.update(updateData).pipe(
            tap(() => ctx.patchState({
                items: changeStatus(ctx.getState().items, action.ids, newStatus),
                lastUpdated: new Date(),
                hasRuningRequest: false
            }))
        );
    }

    @Action(NotificationsUiActions.MoveToInbox)
    public onMoveToInbox$(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.MoveToInbox): Observable<void> {
        ctx.patchState({ hasRuningRequest: true });
        const newStatus = NotificationStatus.VIEWED;

        const updateData: NotificationUpdateRequest = {
            notificationIds: action.ids,
            status: newStatus
        };

        return this.apiService.update(updateData).pipe(
            tap(() => ctx.patchState({
                items: changeStatus(ctx.getState().items, action.ids, newStatus),
                lastUpdated: new Date(),
                hasRuningRequest: false
            }))
        );
    }

    @Action(NotificationsUiActions.Delete)
    public onDelete$(ctx: StateContext<NotificationsUiStateModel>, action: NotificationsUiActions.Delete): Observable<void> {
        ctx.patchState({ hasRuningRequest: true });
        const newStatus = NotificationStatus.NOTIFIED;

        const deleteData: NotificationDeleteRequest = {
            notificationIds: action.ids,
        };

        return this.apiService.delete(deleteData).pipe(
            tap(() => ctx.patchState({
                items: removeNotifications(ctx.getState().items, action.ids),
                lastUpdated: new Date(),
                hasRuningRequest: false
            }))
        );
    }

}

function changeStatus(items: NotificationData[], ids: string[], status: NotificationStatus): NotificationData[] {
    return items.map(x => {
        if (ids.findIndex(i => i === x.id) === -1) return x;
        return { ...x, status };
    });
}

function removeNotifications(items: NotificationData[], ids: string[]): NotificationData[] {
    return items.filter(x => (ids.findIndex(i => i === x.id) === -1) ? true : false);
}
import { Selector } from '@ngxs/store';
import { NotificationsUiState, NotificationsUiStateModel } from './notifications.state';
import { NotificationData, NotificationFolder, NotificationFolderStatus, NotificationStatus } from './notifications.model';

// @dynamic
export class NotificationsUiSelectors {
    @Selector([NotificationsUiState])
    public static all(state: NotificationsUiStateModel): NotificationData[]
    {
        return state.items;
    }

    @Selector([NotificationsUiState])
    public static hasRuningRequest(state: NotificationsUiStateModel): boolean
    {
        return state.hasRuningRequest;
    }

    @Selector([NotificationsUiState])
    public static newCount(state: NotificationsUiStateModel): number
    {
        return state.items.filter(x => x.status === NotificationStatus.NEW).length;
    }

    @Selector([NotificationsUiState])
    public static inboxCount(state: NotificationsUiStateModel): number
    {
        const status = NotificationFolderStatus[NotificationFolder.INBOX];
        return state.items.filter(x => status.findIndex(s => x.status === s) > -1).length;
    }

    @Selector([NotificationsUiState])
    public static archivedCount(state: NotificationsUiStateModel): number
    {
        const status = NotificationFolderStatus[NotificationFolder.ARCHIVED];
        return state.items.filter(x => status.findIndex(s => x.status === s) > -1).length;
    }
}
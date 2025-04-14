import { Selector } from '@ngxs/store';
import { NotificationsUiState, NotificationsUiStateModel } from './notifications.state';
import { NotificationData, NotificationFolder, NotificationFolderStatus, NotificationStatus, NotificationType } from './notifications.model';

// @dynamic
export class NotificationsUiSelectors {
    @Selector([NotificationsUiState])
    public static all(state: NotificationsUiStateModel): NotificationData[]
    {
        return state.items;

        // const mock: NotificationData[] = [
        //     {
        //         id: '1',
        //         category: 'category',
        //         title: 'VIEWED INFO',
        //         body: 'body',
        //         date: new Date(),
        //         status: NotificationStatus.VIEWED,
        //         type: NotificationType.INFO,
        //         link: 'link',
        //         route: 'route',
        //         searchData: 'searchData',
        //     },
        //     {
        //         id: '2',
        //         category: 'category',
        //         title: 'NOTIFIED HELP',
        //         body: 'body',
        //         date: new Date(),
        //         status: NotificationStatus.NOTIFIED,
        //         type: NotificationType.HELP,
        //         link: 'link',
        //         route: 'route',
        //         searchData: 'searchData',
        //     },
        //     {
        //         id: '3',
        //         category: 'category',
        //         title: 'NEW DANGER',
        //         body: 'body',
        //         date: new Date(),
        //         status: NotificationStatus.NEW,
        //         type: NotificationType.DANGER,
        //         link: 'link',
        //         route: 'route',
        //         searchData: 'searchData',
        //     },
        //     {
        //         id: '4',
        //         category: 'category',
        //         title: 'ARCHIVED WARNING',
        //         body: 'body',
        //         date: new Date(),
        //         status: NotificationStatus.ARCHIVED,
        //         type: NotificationType.WARNING,
        //         link: 'link',
        //         route: 'route',
        //         searchData: 'searchData',
        //     },
        //     {
        //         id: '5',
        //         category: 'category',
        //         title: 'NEW SUCCESS',
        //         body: 'body',
        //         date: new Date(),
        //         status: NotificationStatus.NEW,
        //         type: NotificationType.SUCCESS,
        //         link: 'link',
        //         route: 'route',
        //         searchData: 'searchData',
        //     },
        // ];

        // return mock;
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
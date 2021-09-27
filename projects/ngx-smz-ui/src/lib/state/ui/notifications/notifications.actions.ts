import { NotificationGetRequest } from './notifications.model';

const TAG = 'Notifications UI API';

export namespace NotificationsUiActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;

        constructor(public data: NotificationGetRequest) {}
    }

    export class MarkAsViewed {
        public static readonly type = `[${TAG}] Mark As Viewed`;

        constructor(public ids: string[]) {}
    }

    export class Archive {
        public static readonly type = `[${TAG}] Archive`;

        constructor(public ids: string[]) {}
    }

    export class MoveToInbox {
        public static readonly type = `[${TAG}] Move To Inbox`;

        constructor(public ids: string[]) {}
    }

    export class Delete {
        public static readonly type = `[${TAG}] Delete`;

        constructor(public ids: string[]) {}
    }
}
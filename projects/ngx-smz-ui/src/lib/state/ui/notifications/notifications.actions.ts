const TAG = 'Notifications UI API';

export namespace NotificationsUiActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;

        constructor(public data: []) {}
    }
}
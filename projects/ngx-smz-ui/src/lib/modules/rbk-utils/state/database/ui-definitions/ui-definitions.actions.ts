const TAG = 'UI Definitions API';

export namespace UiDefinitionsDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;

        constructor(public data: []) {}
    }
}
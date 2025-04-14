import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';

const TAG = 'UI Definitions API';

export namespace UiDefinitionsDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;

        constructor(public data: []) {}
    }

    export class Inject {
        public static readonly type = `[${TAG}] Inject Ui Definitions`;

        constructor(public data: {[key: string]: FormDefinitionData}) {}
    }
}
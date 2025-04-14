import { SmzUiLocale } from './ui-localization.state';

const TAG = 'UI Localization API';

export namespace UiLocalizationDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;
    }

    export class SetLocales {
        public static readonly type = `[${TAG}] Set Locales`;
        constructor(public locales: SmzUiLocale[]) {}
    }

    export class SetCurrent {
        public static readonly type = `[${TAG}] Set Current`;
        constructor(public current: string) {}
    }
}
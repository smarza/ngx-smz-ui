import { HttpErrorResponse } from '@angular/common/http';
import { LogInfo } from './application.state';

export namespace ApplicationActions {
    export class HandleHttpErrorWithDialog {
        public static readonly type = '[Application] Handle Http Error With Dialog';

        constructor(public error: HttpErrorResponse) { }
    }

    export class HandleHttpErrorWithToast {
        public static readonly type = '[Application] Handle Http Error With Toast';

        constructor(public error: HttpErrorResponse) { }
    }

    export class StartGlobalLoading {
        public static readonly type = '[Application] Start Global Loader';
    }

    export class StopGlobalLoading {
        public static readonly type = '[Application] Stop Global Loader';
    }

    export class NgRxInitialized {
        public static readonly type = '[Application] NgRx Initialized on Client Application';
        constructor() {}
    }

    export class PushLocalLoading {
        public static readonly type = '[Application] Push Local Loading Tag';
        constructor(public tag: string) {}
    }

    export class PopLocalLoading {
        public static readonly type = '[Application] Pop Local Loading Tag';
        constructor(public tag: string) {}
    }

    export class SetLogInfo {
        public static readonly type = '[Application] Set Log Information';
        constructor(public info: LogInfo) {}
    }

    export class SetLogApplicatinArea {
        public static readonly type = '[Application] Set Log Application Area';
        constructor(public area: string) {}
    }

    export class SetLogExtraData {
      public static readonly type = '[Application] Set Log Extra Data';
      constructor(public data: string) {}
    }

    export class SetLogApplicationAreaAndExtraData {
      public static readonly type = '[Application] Set Application Area and Log Extra Data';
      constructor(public area: string, public data: string) {}
    }
}


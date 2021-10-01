import { Message } from 'primeng/api';


export namespace ToastActions {
    export class Custom {
        public static readonly type = '[Application] Show General Toast Message';
        constructor(public message: Partial<Message>) { }
    }

    export class Success {
        public static readonly type = '[Application] Show Success Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class Info {
        public static readonly type = '[Application] Show Info Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class Warning {
        public static readonly type = '[Application] Show Warning Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class Error {
        public static readonly type = '[Application] Show Error Toast Message';
        constructor(public message: string, public title?: string) { }
    }
}


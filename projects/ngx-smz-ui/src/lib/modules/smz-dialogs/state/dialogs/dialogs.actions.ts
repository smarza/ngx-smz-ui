
export namespace DialogsActions
{

    export class Message
    {
        public static readonly type = '[Dialogs] Message';
        constructor(public title: string, public messages: string[]){}
    }

    export class Confirmation
    {
        public static readonly type = '[Dialogs] Confirmation';
        constructor(public title: string, public messages: string[], public isCritical: boolean){}
    }

    export class ConfirmationSuccess
    {
        public static readonly type = '[Dialogs] Confirmation Success';
    }

    export class ConfirmationFailure
    {
        public static readonly type = '[Dialogs] Confirmation Failure';
    }


}
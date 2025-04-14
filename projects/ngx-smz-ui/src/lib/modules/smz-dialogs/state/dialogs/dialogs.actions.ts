import { ElementRef } from '@angular/core';
import { SmzListControl } from '../../../smz-forms/models/control-types';

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

    export class ConfirmOnEnter
    {
        public static readonly type = '[Dialogs] Confirm On Enter';
        constructor(public element: ElementRef, public dialogId: string, public targetEventClick: string, public delayConfirmationRate?: number){}
    }

    export class ShowInputListCreationCrudDialog
    {
        public static readonly type = '[Dialogs] Show InputList Creation Crud Dialog';
        constructor(public title: string, public input: SmzListControl, public value: string){}
    }

    export class ShowInputListCreationCrudDialogSuccess
    {
        public static readonly type = '[Dialogs] Show InputList Creation Crud Dialog Success';
        constructor(public isValid: boolean, public option?: string, public value?: string){}
    }

    export class ShowInputListBatchCreationCrudDialog
    {
        public static readonly type = '[Dialogs] Show InputList Batch Creation Crud Dialog';
        constructor(public title: string, public input: SmzListControl){}
    }

    export class ShowInputListBatchCreationCrudDialogSuccess
    {
        public static readonly type = '[Dialogs] Show InputList Batch Creation Crud Dialog Success';
        constructor(public isValid: boolean, public values?: string[]){}
    }


}
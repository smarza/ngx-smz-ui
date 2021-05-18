
export namespace RouterParamsActions
{
    export class Update
    {
        public static readonly type = '[Router Params] Update';
        constructor(public key: any, public data: any) { }

    }
}
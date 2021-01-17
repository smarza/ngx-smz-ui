import { FaqDetails, FaqCreation, FaqUpdate } from '../models/faqs';

export namespace FaqsDbActions
{
    export class LoadAll
    {
        public static readonly type = '[Faqs API] Load All';
        constructor(public tag: string, public forceUpdate = false, public loaderOverride = false) { }
    }

    export class LoadAllSuccess
    {
        public static readonly type = '[Faqs API] Load All Success';
        constructor(public tag: string, public items: FaqDetails[]) {}
    }



    export class Create
    {
        public static readonly type = '[Faqs API] Create';

        constructor(public data: FaqCreation) { }
    }

    export class CreateSuccess
    {
        public static readonly type = '[Faqs API] Create Success';

        constructor(public data: FaqDetails, public tag: string) { }
    }

    export class Delete
    {
        public static readonly type = '[Faqs API] Delete';

        constructor(public id: string, public tag: string) { }
    }

    export class DeleteSuccess
    {
        public static readonly type = '[Faqs API] Delete Success';
        constructor(public id: string, public tag: string) { }
    }

    export class Update
    {
        public static readonly type = '[Faqs API] Update';

        constructor(public data: FaqUpdate) { }
    }

    export class UpdateSuccess
    {
        public static readonly type = '[Faqs API] Update Success';
        constructor(public data: FaqDetails, public tag: string) { }
    }

}

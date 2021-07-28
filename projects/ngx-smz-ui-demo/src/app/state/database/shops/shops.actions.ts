import { ShopDetails } from '../../../models/shop';


export namespace ShopsDbActions
{
    export class LoadAll
    {
        public static readonly type = '[Shops API] Load All';

        constructor(public loaderOverride: boolean) { }
    }

    export class LoadAllSuccess
    {
        public static readonly type = '[Shops API] Load All Success';

        constructor(public data: ShopDetails[]) { }
    }

}
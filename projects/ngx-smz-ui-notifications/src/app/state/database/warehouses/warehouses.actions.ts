import { Warehouse } from '@models/warehouse';


export namespace WarehousesDbActions
{
    export class LoadAll
    {
        public static readonly type = '[Warehouses API] Load All';
        constructor(public loaderOverride: boolean) { }
    }

    export class LoadAllSuccess
    {
        public static readonly type = '[Warehouses API] Load All Success';

        constructor(public data: Warehouse[]) { }
    }

}
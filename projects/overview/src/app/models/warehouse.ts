import { SimpleNamedEntity } from '@ngx-smz/core';

export interface Warehouse
{
    id: string;
    name: string;
    isActive: boolean;
    shop: SimpleNamedEntity;
    isShowroom: boolean;
}

export interface WarehouseCreation
{
    name: string;
    isActive: boolean;
    shopId: string;
}

export interface WarehouseUpdateData
{
    id: string;
    name: string;
    isActive: boolean;
    shopId: string;
}

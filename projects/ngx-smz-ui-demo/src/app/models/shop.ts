import { SimpleNamedEntity } from 'ngx-smz-ui';

export interface ShopListItem
{
    id: string;
    name: string;
    isActive: boolean;
    supervisor: SimpleNamedEntity;
    venture: SimpleNamedEntity;
    warehouse: SimpleNamedEntity;
    logo: string;

}

export interface ShopDetails
{
    id: string;
    name: string;
    isActive: boolean;
    phone: string;
    email: string;
    logo: string;
    address: any;
    warehouse: SimpleNamedEntity;
    venture: SimpleNamedEntity;
    supervisor: SimpleNamedEntity;
    employees: SimpleNamedEntity[];

}

export interface ShopUpdate
{
    id: string;
    name: string;
    phone: string;
    email: string;
    ventureId: string;
    warehouseId: string;
}

export interface ShopCreation
{
    name: string;
}

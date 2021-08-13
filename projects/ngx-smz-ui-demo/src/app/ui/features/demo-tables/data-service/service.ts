import { SimpleEntity } from 'ngx-smz-ui';

export interface ServiceDetails
{
    id: string;
    description: string;
    isActive: boolean;
    cost: number;
    price: number;
    type: SimpleEntity<Number>;
    unchargeable: boolean;
    visibleToCustomer: boolean;
    acceptanceTerm: string;
}

export interface ServiceData
{
    id: string;
    description: string;
    value: number;
    acceptanceTerm: string;
    unchargeable: boolean;
    visibleToCustomer: boolean;
}

export interface ServiceCreation
{
    description: string;
    cost: number;
    price: number;
    type: number;
    unchargeable: boolean;
    visibleToCustomer: boolean;
    acceptanceTerm: string;
}

export interface ServiceUpdateData
{
    id: string;
    isActive: boolean;
    description: string;
    cost: number;
    price: number;
    type: number;
    unchargeable: boolean;
    visibleToCustomer: boolean;
    acceptanceTerm: string;
}

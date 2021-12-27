import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Customer } from './customer';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return firstValueFrom(this.http.get<any>('assets/showcase/data/customers-small.json'))
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }

    getCustomersMedium() {
        return firstValueFrom(this.http.get<any>('assets/showcase/data/customers-medium.json'))
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }

    getCustomersLarge() {
        return firstValueFrom(this.http.get<any>('assets/customers-large.json'))
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }

    getCustomersXLarge() {
        return firstValueFrom(this.http.get<any>('assets/showcase/data/customers-xlarge.json'))
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }

    getCustomers(params) {
        return firstValueFrom(this.http.get<any>('https://www.primefaces.org/data/customers', {params: params}));
    }
}
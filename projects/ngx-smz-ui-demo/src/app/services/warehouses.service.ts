import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from 'ngx-rbk-utils';
import { environment } from '../../environments/environment';
import { Warehouse } from '../models/warehouse';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WarehousesService extends BaseApiService
{
    private endpoint = `${environment.authenticationApi}/api/warehouses`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public all(loaderOverride: boolean = false): Observable<Warehouse[]>
    {
        return this.http.get<Warehouse[]>(`${this.endpoint}`,
            this.generateDefaultHeaders({compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

}

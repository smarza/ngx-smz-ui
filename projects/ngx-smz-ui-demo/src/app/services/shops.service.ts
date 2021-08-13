import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from 'ngx-rbk-utils';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ShopDetails } from '../models/shop';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ShopsService extends BaseApiService
{
    private endpoint = `${environment.authenticationApi}/api/shops`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public all(loaderOverride: boolean = false): Observable<ShopDetails[]>
    {
        return this.http.get<ShopDetails[]>(`${this.endpoint}`,
            this.generateDefaultHeaders({compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public details(id: string, loaderOverride: boolean = false): Observable<ShopDetails>
    {
        return this.http.get<ShopDetails>(`${this.endpoint}/${id}`,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }


}

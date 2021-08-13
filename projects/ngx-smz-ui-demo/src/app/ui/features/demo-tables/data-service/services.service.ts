import { BaseApiService } from 'ngx-rbk-utils';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceCreation, ServiceDetails, ServiceUpdateData } from './service';
import { Observable } from 'rxjs';
import { environment } from '@enviroment';

@Injectable({
    providedIn: 'root'
})
export class ServicesService extends BaseApiService
{
    private endpoint = `${environment.authenticationApi}/api/services`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public all(loaderOverride: boolean = false): Observable<ServiceDetails[]>
    {
        return this.http.get<ServiceDetails[]>(`${this.endpoint}`,
            this.generateDefaultHeaders({compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public create(data: ServiceCreation, loaderOverride: boolean = false): Observable<ServiceDetails>
    {
        return this.http.post<ServiceDetails>(`${this.endpoint}`, data,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public update(data: ServiceUpdateData, loaderOverride: boolean = false): Observable<ServiceDetails>
    {
        return this.http.put<ServiceDetails>(`${this.endpoint}`, data,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public activate(id: string, loaderOverride: boolean = false): Observable<void>
    {
        return this.http.post<void>(`${this.endpoint}/${id}/activate`, null,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public deactivate(id: string, loaderOverride: boolean = false): Observable<void>
    {
        return this.http.post<void>(`${this.endpoint}/${id}/deactivate`, null,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public delete(id: string, loaderOverride: boolean = false): Observable<void>
    {
        return this.http.delete<void>(`${this.endpoint}/${id}`,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }
}

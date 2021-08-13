import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaqDetails, FaqCreation, FaqUpdate } from '../models/faqs';
import { Observable } from 'rxjs';
import { SmzFaqsConfig } from '../smz-faqs.config';
import { BaseApiService } from '../../rbk-utils/http/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class FaqsApiService extends BaseApiService
{

    constructor(private http: HttpClient, private config: SmzFaqsConfig)
    {
        super();
    }

    public all(tag: string, loaderOverride: boolean = false): Observable<FaqDetails[]>
    {
        return this.http.get<FaqDetails[]>(`${this.config.endpoint}/${tag}`,
            this.generateDefaultHeaders({compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true}));
    }

    public create(data: FaqCreation): Observable<FaqDetails>
    {
        return this.http.post<FaqDetails>(`${this.config.endpoint}`, data,
            this.generateDefaultHeaders({compression: false, authentication: true}));
    }

    public update(data: FaqUpdate): Observable<FaqDetails>
    {
        return this.http.put<FaqDetails>(`${this.config.endpoint}`, data,
            this.generateDefaultHeaders({compression: false, authentication: true}));
    }

    public delete(id: string): Observable<void>
    {
        return this.http.delete<void>(`${this.config.endpoint}/${id}`,
            this.generateDefaultHeaders({compression: false, authentication: true}));
    }
}

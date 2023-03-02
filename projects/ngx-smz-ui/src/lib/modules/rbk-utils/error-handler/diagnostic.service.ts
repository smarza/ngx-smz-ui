import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Observable } from 'rxjs';
import { DiagnosticsData } from './diagnostics-data';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({ providedIn: 'root' })
export class DiagnosticsService extends BaseApiService {
    constructor(private http: HttpClient) {
        super();
    }

    public log(data: DiagnosticsData): Observable<void> {
        return this.http.post<void>(GlobalInjector.config.rbkUtils.diagnostics.url, data,
            this.generateDefaultHeaders({
                loadingBehavior: 'none',
                authentication: false,
                errorHandlingType: 'none'
            }));
    }
}
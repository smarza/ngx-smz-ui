import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Observable } from 'rxjs';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { DiagnosticsData } from './diagnostics-data';

@Injectable({ providedIn: 'root' })
export class DiagnosticsService extends BaseApiService {
    constructor(private http: HttpClient, private rbkConfig: NgxRbkUtilsConfig) {
        super();
    }

    public log(data: DiagnosticsData): Observable<void> {
        return this.http.post<void>(this.rbkConfig.diagnostics.url, data,
            this.generateDefaultHeaders({
                loadingBehavior: 'none',
                authentication: false,
                errorHandlingType: 'none'
            }));
    }
}
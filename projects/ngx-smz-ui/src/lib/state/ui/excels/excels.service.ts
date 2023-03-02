import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { SmzExcelState, SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({
    providedIn: 'root'
})
export class ExcelsService extends BaseApiService
{
    private endpoint = `excel`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public generateTables(data: SmzExcelState, loaderOverride: boolean = false): Observable<SmzExcelsDetails>
    {
        const serverUrl = GlobalInjector.config.rbkUtils.excels?.url ?? environment.serverUrl;

        return this.http.post<SmzExcelsDetails>(`${serverUrl}/api/${this.endpoint}/generate-tables`, data,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}

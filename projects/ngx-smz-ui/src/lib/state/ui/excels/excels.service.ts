import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { SmzCreateExcelTable, SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';

@Injectable({
    providedIn: 'root'
})
export class ExcelsService extends BaseApiService
{
    private endpoint = `${environment.serverUrl}/api/excel`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public generateTables(data: SmzCreateExcelTable, loaderOverride: boolean = false): Observable<SmzExcelsDetails>
    {
        return this.http.post<SmzExcelsDetails>(`${this.endpoint}/generate-tables`, data,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}

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

    constructor(private http: HttpClient)
    {
        super();
    }

    public generateTables(data: SmzExcelState, loaderOverride: boolean = false): Observable<SmzExcelsDetails>
    {
        const serverUrl = GlobalInjector.config.tables.export.absoluteApiUrl;

        return this.http.post<SmzExcelsDetails>(serverUrl, data,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}

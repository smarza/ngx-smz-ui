import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { SmzExcelState, SmzExcelsDetails } from '../../../modules/smz-excels/models/smz-excel-table';
import { GlobalInjector } from '../../../common/services/global-injector';
import { SmzEnvironment } from '../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class ExcelsService extends BaseApiService {
    private readonly environment = inject(SmzEnvironment);

    constructor(private http: HttpClient)
    {
        super();
    }

    public generateTables(data: SmzExcelState, loaderOverride: boolean = false): Observable<SmzExcelsDetails>
    {
        const url = `${this.environment.serverUrl}${GlobalInjector.config.tables.export.absoluteApiUrl}`;

        return this.http.post<SmzExcelsDetails>(url, data,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}

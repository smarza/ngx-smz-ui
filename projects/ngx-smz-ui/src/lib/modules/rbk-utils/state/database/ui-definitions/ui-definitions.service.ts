import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxRbkUtilsConfig } from '../../../ngx-rbk-utils.config';
import { BaseApiService } from '../../../http/base-api.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from 'ngx-smz-dialogs';

@Injectable({providedIn: 'root'})
export class UiDefinitionsService extends BaseApiService {
    constructor(private http: HttpClient, private rbkConfig: NgxRbkUtilsConfig) {
        super();
    }

    public all(): Observable<{[key: string]: FormDefinitionData}> {
        return this.http.get<{[key: string]: FormDefinitionData}>(this.rbkConfig.uiDefinitions.url,
            this.generateDefaultHeaders(this.rbkConfig.uiDefinitions.httpBehavior));
    }
}


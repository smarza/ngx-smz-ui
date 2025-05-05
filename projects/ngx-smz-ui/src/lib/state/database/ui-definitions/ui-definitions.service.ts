import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';
import { GlobalInjector } from '../../../common/services/global-injector';
import { SmzEnvironment } from '../../../config/config';

@Injectable({providedIn: 'root'})
export class UiDefinitionsService extends BaseApiService {
    private readonly environment = inject(SmzEnvironment);
    constructor(private http: HttpClient) {
        super();
    }

    public all(): Observable<{[key: string]: FormDefinitionData}> {
        const url = `${this.environment.serverUrl}${GlobalInjector.config.rbkUtils.uiDefinitions.url}`;
        return this.http.get<{[key: string]: FormDefinitionData}>(url,
            this.generateDefaultHeaders(GlobalInjector.config.rbkUtils.uiDefinitions.httpBehavior));
    }
}


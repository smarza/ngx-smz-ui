import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({providedIn: 'root'})
export class UiDefinitionsService extends BaseApiService {
    constructor(private http: HttpClient) {
        super();
    }

    public all(): Observable<{[key: string]: FormDefinitionData}> {
        return this.http.get<{[key: string]: FormDefinitionData}>(GlobalInjector.config.rbkUtils.uiDefinitions.url,
            this.generateDefaultHeaders(GlobalInjector.config.rbkUtils.uiDefinitions.httpBehavior));
    }
}


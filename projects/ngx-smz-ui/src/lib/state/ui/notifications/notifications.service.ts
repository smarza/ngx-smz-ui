import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxRbkUtilsConfig } from '../../../modules/rbk-utils/ngx-rbk-utils.config';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { FormDefinitionData } from '../../../builders/smz-dialogs/dialog-input-conversion';

@Injectable({providedIn: 'root'})
export class UiNotificationsService extends BaseApiService {
    constructor(private http: HttpClient, private rbkConfig: NgxRbkUtilsConfig) {
        super();
    }

    public all(): Observable<{[key: string]: FormDefinitionData}> {
        return this.http.get<{[key: string]: FormDefinitionData}>(this.rbkConfig.notifications.url,
            this.generateDefaultHeaders(this.rbkConfig.notifications.httpBehavior));
    }
}


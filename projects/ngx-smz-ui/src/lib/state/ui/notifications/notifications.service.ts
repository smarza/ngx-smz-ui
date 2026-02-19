import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { NotificationData, NotificationGetRequest, NotificationUpdateRequest, NotificationDeleteRequest } from './notifications.model';
import { fixDates } from '../../../modules/rbk-utils/utils/operators';
import { GlobalInjector } from '../../../common/services/global-injector';
import { SmzEnvironment } from '../../../config/config';

@Injectable({providedIn: 'root'})
export class UiNotificationsService extends BaseApiService {
    private readonly environment = inject(SmzEnvironment);

    constructor(private http: HttpClient) {
        super();
    }

    public all(data: NotificationGetRequest): Observable<NotificationData[]> {
        const url = `${this.environment.serverUrl}${GlobalInjector.config.rbkUtils.notifications.url}/all`;

        return this.http.post<NotificationData[]>(url, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'none' }))
            .pipe(fixDates());
    }

    public update(data: NotificationUpdateRequest): Observable<void> {
        const url = `${this.environment.serverUrl}${GlobalInjector.config.rbkUtils.notifications.url}/update`;

        return this.http.put<void>(url, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }

    public delete(data: NotificationDeleteRequest): Observable<void> {
        const url = `${this.environment.serverUrl}${GlobalInjector.config.rbkUtils.notifications.url}/delete`;

        return this.http.post<void>(url, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }
}


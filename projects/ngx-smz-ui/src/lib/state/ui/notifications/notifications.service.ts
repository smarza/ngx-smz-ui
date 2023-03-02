import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { NotificationData, NotificationGetRequest, NotificationUpdateRequest, NotificationDeleteRequest } from './notifications.model';
import { fixDates } from '../../../modules/rbk-utils/utils/operators';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({providedIn: 'root'})
export class UiNotificationsService extends BaseApiService {

    constructor(private http: HttpClient) {
        super();
    }

    public all(data: NotificationGetRequest): Observable<NotificationData[]> {
        return this.http.post<NotificationData[]>(`${GlobalInjector.config.rbkUtils.notifications.url}/all`, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'none' }))
            .pipe(fixDates());
    }

    public update(data: NotificationUpdateRequest): Observable<void> {
        return this.http.put<void>(`${GlobalInjector.config.rbkUtils.notifications.url}/update`, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }

    public delete(data: NotificationDeleteRequest): Observable<void> {
        return this.http.post<void>(`${GlobalInjector.config.rbkUtils.notifications.url}/delete`, data,
            this.generateDefaultHeaders({...GlobalInjector.config.rbkUtils.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }
}


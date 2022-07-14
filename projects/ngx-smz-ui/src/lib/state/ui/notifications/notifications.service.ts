import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxRbkUtilsConfig } from '../../../modules/rbk-utils/ngx-rbk-utils.config';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { NotificationData, NotificationGetRequest, NotificationUpdateRequest, NotificationDeleteRequest } from './notifications.model';
import { fixDates } from '../../../modules/rbk-utils/utils/operators';

@Injectable({providedIn: 'root'})
export class UiNotificationsService extends BaseApiService {

    constructor(private http: HttpClient, private rbkConfig: NgxRbkUtilsConfig) {
        super();
    }

    public all(data: NotificationGetRequest): Observable<NotificationData[]> {
        return this.http.post<NotificationData[]>(`${this.rbkConfig.notifications.url}/all`, data,
            this.generateDefaultHeaders({...this.rbkConfig.notifications.httpBehavior, errorHandlingType: 'none' }))
            .pipe(fixDates());
    }

    public update(data: NotificationUpdateRequest): Observable<void> {
        return this.http.put<void>(`${this.rbkConfig.notifications.url}/update`, data,
            this.generateDefaultHeaders({...this.rbkConfig.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }

    public delete(data: NotificationDeleteRequest): Observable<void> {
        return this.http.post<void>(`${this.rbkConfig.notifications.url}/delete`, data,
            this.generateDefaultHeaders({...this.rbkConfig.notifications.httpBehavior, errorHandlingType: 'toast' }));
    }
}


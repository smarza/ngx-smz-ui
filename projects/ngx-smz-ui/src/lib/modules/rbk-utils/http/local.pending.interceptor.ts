import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { LOADING_BEHAVIOR_HEADER, LOCAL_LOADING_TAG_HEADER } from './base-api.service';
import { ApplicationActions } from '../state/global/application/application.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { map, catchError, finalize } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalPendingInterceptorService implements HttpInterceptor {
    constructor(private store: Store, private rbkConfig: NgxRbkUtilsConfig) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loadingType = request.headers.get(LOADING_BEHAVIOR_HEADER);
        const loadingTag = request.headers.get(LOCAL_LOADING_TAG_HEADER);

        if (loadingType === 'local') {
            if (loadingTag == null) {
                throw new Error(`When using the ${LOADING_BEHAVIOR_HEADER}=local you need to specify a value to the ${LOCAL_LOADING_TAG_HEADER}`);
            }

            this.store.dispatch(new ApplicationActions.PushLocalLoading(loadingTag));

            return next.handle(request).pipe(
                map(event => {
                    return event;
                }),
                catchError(error => {
                    return throwError(error);
                }),
                finalize(() => {
                    this.store.dispatch(new ApplicationActions.PopLocalLoading(loadingTag));
                })
            );
        }
        else {
            return next.handle(request);
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { LOADING_BEHAVIOR_HEADER } from './base-api.service';
import { ApplicationActions } from '../state/global/application/application.actions';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GlobalPendingInterceptorService implements HttpInterceptor {
    private pendingRequests = 0;

    constructor(private store: Store, private rbkConfig: NgxRbkUtilsConfig) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loadingType = request.headers.get(LOADING_BEHAVIOR_HEADER);

        if (loadingType === 'global') {

            this.pendingRequests++;

            if (this.pendingRequests === 1) {
                // if after a timer there still are pending request ongoing, set the isLoading flag
                if (this.pendingRequests > 0) {
                    this.store.dispatch(new ApplicationActions.StartGlobalLoading());
                }
            }

            return next.handle(request).pipe(
                map(event => {
                    return event;
                }),
                catchError(error => {
                    return throwError(error);
                }),
                finalize(() => {
                    this.pendingRequests--;

                    if (this.pendingRequests === 0) {
                        setTimeout(() => {
                            this.store.dispatch(new ApplicationActions.StopGlobalLoading());
                        }, 0);

                    }
                })
            );
        }
        else {
            return next.handle(request);
        }
    }
}
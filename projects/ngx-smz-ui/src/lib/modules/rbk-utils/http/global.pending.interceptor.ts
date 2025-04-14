import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { LOADING_BEHAVIOR_HEADER } from './base-api.service';
import { ApplicationActions } from '../../../state/global/application/application.actions';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { GlobalInjector } from '../../../common/services/global-injector';
import { NgxSmzUiConfig } from '../../../ngx-smz-ui.config';

@Injectable({
    providedIn: 'root'
})
export class GlobalPendingInterceptorService implements HttpInterceptor {
    private pendingRequests = 0;
    private config: NgxSmzUiConfig;

    constructor(private store: Store) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.config == null) {
            this.config = GlobalInjector.config;
        }

        const loadingType = request.headers.get(LOADING_BEHAVIOR_HEADER);

        if (loadingType === 'global') {

            this.pendingRequests++;

            if (this.pendingRequests === 1) {
                // if after a timer there still are pending request ongoing, set the isLoading flag
                if (this.pendingRequests > 0) {

                    if (GlobalInjector.debugMode) console.log(`[GlobalPendingInterceptor: ${request.url}] Starting Global Loading `);
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

                            if (this.pendingRequests === 0) {
                                if (GlobalInjector.debugMode) console.log(`[GlobalPendingInterceptor: ${request.url}] Stoping Global Loading `);
                                this.store.dispatch(new ApplicationActions.StopGlobalLoading());
                            }

                        }, this.config.layouts.loader.globalLoaderPendingTimeout ?? 0);
                    }
                })
            );
        }
        else {
            return next.handle(request);
        }
    }
}
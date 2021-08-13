import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, share } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthHandler } from './auth.handler';
import { AUTHENTICATION_HEADER, REFRESH_TOKEN_BEHAVIOR_HEADER } from '../http/base-api.service';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';
import { AuthenticationActions } from '../state/global/authentication/authentication.actions';
import { isEmpty } from '../utils/utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private rbkConfig: NgxRbkUtilsConfig, private store: Store) { }

    private inflightAuthRequest: Observable<string> = null;

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.rbkConfig.debugMode) console.log(`[AuthInterceptor: ${req.url}] Intercepting request for `, req);

        if (req.headers.get(AUTHENTICATION_HEADER) == null ||
            req.headers.get(REFRESH_TOKEN_BEHAVIOR_HEADER) == null) {
            if (this.rbkConfig.debugMode) console.log(`[AuthInterceptor: ${req.url}] This request does not need refresh token`);
            return next.handle(req);
        }

        const authService = this.injector.get(AuthHandler);

        if (!this.inflightAuthRequest) {
            if (this.rbkConfig.debugMode) console.log(`[AuthInterceptor: ${req.url}] inflight request does not exit, creating one`);
            this.inflightAuthRequest = authService.getToken().pipe(
                share()
            );
        }

        return this.inflightAuthRequest.pipe(
            switchMap((newToken: string) => {
                // unset request inflight
                this.inflightAuthRequest = null;
                let authReq = req;
                if (!isEmpty(newToken)) {
                  // use the newly returned token
                  authReq = req.clone({
                      headers: req.headers.set(AUTHENTICATION_HEADER, `Bearer ${newToken}`)
                  });
                }
                return next.handle(authReq);
            }),
            catchError((error: HttpErrorResponse) => {
                // checks if a url is to an admin api or not
                if (error.status === 401) {
                    // check if the response is from the token refresh end point
                    const isFromRefreshTokenEndpoint = error.url === this.rbkConfig.authentication.refreshToken.url;
                    if (isFromRefreshTokenEndpoint) {
                        console.error('Problem while trying to automatically refresh the token, redirecting to login');

                        this.inflightAuthRequest = null;
                        this.store.dispatch(new AuthenticationActions.Logout());
                        return throwError(error);
                    }

                    if (!this.inflightAuthRequest) {
                        this.inflightAuthRequest = authService.refreshToken().pipe(
                            share()
                        );

                        if (!this.inflightAuthRequest) {
                            console.warn('Unknown error while trying to refresh then token, redirecting to login');
                            this.store.dispatch(new AuthenticationActions.Logout());
                            return throwError(error);
                        }
                    }

                    return this.inflightAuthRequest.pipe(
                        switchMap((newToken: string) => {
                            this.inflightAuthRequest = null;

                            let authReqRepeat = req;

                            if (!isEmpty(newToken)) {
                              // use the newly returned token
                              authReqRepeat = req.clone({
                                headers: req.headers.set(AUTHENTICATION_HEADER, `Bearer ${newToken}`)
                              });
                            }

                            return next.handle(authReqRepeat);
                        })
                    );
                }
                else {
                    this.inflightAuthRequest = null;
                    throw (error);
                }
            })
        );
    }
}

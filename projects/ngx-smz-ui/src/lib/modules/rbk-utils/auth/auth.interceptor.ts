import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, share } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthHandler } from './auth.handler';
import { AUTHORIZATION_HEADER, REFRESH_TOKEN_BEHAVIOR_HEADER, WINDOWS_AUTHENTICATION_HEADER } from '../http/base-api.service';
import { AuthenticationActions } from '../../../state/global/authentication/authentication.actions';
import { isEmpty } from '../utils/utils';
import { GlobalInjector } from '../../../common/services/global-injector';
import { NgxSmzUiConfig } from '../../../ngx-smz-ui.config';
import { DiagnosticsService } from '../error-handler/diagnostic.service';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private config: NgxSmzUiConfig;

    constructor(private injector: Injector, private store: Store, private diagnosticsService: DiagnosticsService) { }

    private inflightAuthRequest: Observable<string> = null;

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.config == null) {
            this.config = GlobalInjector.config;
        }

        if (this.config.debugMode) console.log(`[AuthInterceptor: ${req.url}] Intercepting request for `, req);

        if (req.headers.get(WINDOWS_AUTHENTICATION_HEADER) != null) {
            req = req.clone({ withCredentials: true });
        }

        if (req.headers.get(AUTHORIZATION_HEADER) == null ||
            req.headers.get(REFRESH_TOKEN_BEHAVIOR_HEADER) == null) {
            if (this.config.debugMode) console.log(`[AuthInterceptor: ${req.url}] This request does not need refresh token`);
            return next.handle(req);
        }

        const authService = this.injector.get(AuthHandler);

        if (!this.inflightAuthRequest) {
            if (this.config.debugMode) console.log(`[AuthInterceptor: ${req.url}] inflight request does not exit, creating one`);
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
                      headers: req.headers.set(AUTHORIZATION_HEADER, `Bearer ${newToken}`)
                  });
                }
                return next.handle(authReq);
            }),
            catchError((error: HttpErrorResponse) => {
                // checks if a url is to an admin api or not
                if (error.status === 401) {
                    // check if the response is from the token refresh end point
                    const isFromRefreshTokenEndpoint = error.url === this.config.rbkUtils.authentication.refreshToken.url;
                    if (isFromRefreshTokenEndpoint) {
                        console.error('Problem while trying to automatically refresh the token, redirecting to login');

                        this.inflightAuthRequest = null;
                        this.diagnosticsService.username = this.store.selectSnapshot(AuthenticationSelectors.username);
                        this.store.dispatch(new AuthenticationActions.Logout(this.config.rbkUtils.authentication.login.route));
                        return throwError(error);
                    }

                    if (!this.inflightAuthRequest) {
                        this.inflightAuthRequest = authService.refreshToken().pipe(
                            share()
                        );

                        if (!this.inflightAuthRequest) {
                            console.warn('Unknown error while trying to refresh then token, redirecting to login');
                            this.diagnosticsService.username = this.store.selectSnapshot(AuthenticationSelectors.username);
                            this.store.dispatch(new AuthenticationActions.Logout(this.config.rbkUtils.authentication.login.route));
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
                                headers: req.headers.set(AUTHORIZATION_HEADER, `Bearer ${newToken}`)
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

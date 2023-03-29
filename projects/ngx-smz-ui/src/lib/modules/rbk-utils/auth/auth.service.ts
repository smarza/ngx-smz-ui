import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Observable } from 'rxjs';
import { LoginResponse } from './models';
import { map } from 'rxjs/operators';
import { GlobalInjector } from '../../../common/services/global-injector';

export interface LoginPayload { username: string, password: string, extraProperties: {[name: string]: string} };

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {
    constructor(private http: HttpClient) {
        super();
    }

    public login(username: string, password: string, extraProperties: {[name: string]: string} = null): Observable<LoginResponse> {
        let data = { username, password };

        if (extraProperties != null) {
            data = { ...data, ...extraProperties };
        }

        return this.http.post<any>(GlobalInjector.config.rbkUtils.authentication.login.url, data,
            this.generateDefaultHeaders({
                loadingBehavior: GlobalInjector.config.rbkUtils.authentication.login.loadingBehavior,
                authentication: false,
                useWindowsAuthentication: GlobalInjector.config.rbkUtils.authentication.useWindowsAuthentication,
                mockedUserId: username,
                errorHandlingType: GlobalInjector.config.rbkUtils.authentication.login.errorHandlingType,
                localLoadingTag: GlobalInjector.config.rbkUtils.authentication.login.loadingBehavior === 'local' ? 'login' : null
            })).pipe(
                map(x => ({
                    ...x,
                    accessToken: x[GlobalInjector.config.rbkUtils.authentication.login.responsePropertyName],
                    refreshToken: x[GlobalInjector.config.rbkUtils.authentication.refreshToken.responsePropertyName]
                })));
    }

    public refreshToken(refreshToken: string, extraProperties: {[name: string]: string} = null): Observable<LoginResponse> {
        let data = { refreshToken };
        if (extraProperties != null) {
          data = { ...data, ...extraProperties };
        }
        return this.http.post<LoginResponse>(GlobalInjector.config.rbkUtils.authentication.refreshToken.url, data,
            this.generateDefaultHeaders({
                loadingBehavior: GlobalInjector.config.rbkUtils.authentication.refreshToken.loadingBehavior,
                authentication: false,
                useWindowsAuthentication: GlobalInjector.config.rbkUtils.authentication.useWindowsAuthentication,
                errorHandlingType: GlobalInjector.config.rbkUtils.authentication.refreshToken.errorHandlingType,
                localLoadingTag: GlobalInjector.config.rbkUtils.authentication.refreshToken.loadingBehavior === 'local' ? 'refresh-token' : null
            })).pipe(
                map(x => ({
                    ...x,
                    accessToken: x[GlobalInjector.config.rbkUtils.authentication.login.responsePropertyName],
                    refreshToken: x[GlobalInjector.config.rbkUtils.authentication.refreshToken.responsePropertyName]
                })));
    }

}


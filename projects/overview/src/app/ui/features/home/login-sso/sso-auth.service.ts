import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService, GlobalInjector, HttpBehaviorParameters, LoginResponse } from '@ngx-smz/core';
import { environment } from '../../../../../environments/environment';
import { ApiLoginPayload } from './sso-login-payload';

@Injectable({ providedIn: 'root' })
export class SsoAuthService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }

  public login(data: ApiLoginPayload): Observable<LoginResponse> {
    const parameters: Partial<HttpBehaviorParameters> = {
      loadingBehavior: GlobalInjector.config.rbkUtils.authentication.login.loadingBehavior,
      authentication: false,
      useWindowsAuthentication: false,
      // TODO: Verificar pra que serve
      // mockedUserId: username,
      errorHandlingType: GlobalInjector.config.rbkUtils.authentication.login.errorHandlingType,
      localLoadingTag: GlobalInjector.config.rbkUtils.authentication.login.loadingBehavior === 'local' ? 'login' : null,
    };

    const url = `${environment.authenticationApi}/api/ca/login`;

    return this.http.post<LoginResponse>(url, data, this.generateDefaultHeaders(parameters)
    )
      .pipe(
        map((response) => ({
          ...response,
          accessToken: response[GlobalInjector.config.rbkUtils.authentication.login.responsePropertyName],
          refreshToken: response[GlobalInjector.config.rbkUtils.authentication.refreshToken.responsePropertyName],
        }))
      );
  }

}

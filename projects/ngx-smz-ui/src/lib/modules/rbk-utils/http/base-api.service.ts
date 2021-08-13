import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../misc/global.injector';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

export const LOADING_BEHAVIOR_HEADER = 'Loading-Behavior';
export const ERROR_HANDLING_TYPE_HEADER = 'Error-Handling-Type';
export const REFRESH_TOKEN_BEHAVIOR_HEADER = 'Refresh-Token-Behavior';
export const AUTHENTICATION_HEADER = 'Authorization';
export const CONTENT_ENCODING_HEADER = 'Content-Encoding';
export const LOCAL_LOADING_TAG_HEADER = 'Local-Loading-Tag';
export const RESTORE_STATE_ON_ERROR_HEADER = 'Restore-State-On-Error';
export const IGNORE_ERROR_HANDLING = 'Ignore-Error-Handling'

export class BaseApiService {
    constructor() { }

    protected generateDefaultHeaders(parameters: Partial<HttpBehaviorParameters>): { headers: HttpHeaders } {
        const store = GlobalInjector.instance.get(Store);

        let headers = new HttpHeaders();

        const config = GlobalInjector.instance.get(NgxRbkUtilsConfig);

        const defaulValues: HttpBehaviorParameters = {...config.httpBehaviors.defaultParameters};

        const finalParameters = { ...defaulValues, ...parameters };

        if (finalParameters.compression === true) {
            headers = headers.set(CONTENT_ENCODING_HEADER, 'gzip');
        }

        if (finalParameters.restoreStateOnError === true) {
            headers = headers.set(RESTORE_STATE_ON_ERROR_HEADER, 'true');
        }

        if (finalParameters.authentication === true) {
            // Não pode usar o selector do AuthenticationSelectors por causa de referencia cruzada
            headers = headers.set(AUTHENTICATION_HEADER, 'Bearer ' + store.selectSnapshot(x => x.global.authentication.accessToken));
        }

        if (finalParameters.needToRefreshToken === true) {
            headers = headers.set(REFRESH_TOKEN_BEHAVIOR_HEADER, 'true');
        }

        if (finalParameters.localLoadingTag != null) {
            headers = headers.set(LOCAL_LOADING_TAG_HEADER, finalParameters.localLoadingTag);
        }

        headers = headers.set(LOADING_BEHAVIOR_HEADER, finalParameters.loadingBehavior);

        headers = headers.set(ERROR_HANDLING_TYPE_HEADER, finalParameters.errorHandlingType);

        if (finalParameters.ignoreErrorHandling === true) {
          headers = headers.set(IGNORE_ERROR_HANDLING, 'true');
        }

        return { headers };
    }
}

export interface HttpBehaviorParameters {
    compression: boolean;
    authentication: boolean;
    needToRefreshToken: boolean;
    loadingBehavior: 'global' | 'local' | 'none';
    errorHandlingType: 'toast' | 'dialog' | 'none';
    localLoadingTag: string;
    restoreStateOnError: boolean;
    ignoreErrorHandling: boolean;
}

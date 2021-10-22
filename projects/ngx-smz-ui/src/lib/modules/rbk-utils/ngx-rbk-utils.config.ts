import { SmzDocumentConfig } from '../smz-documents/models/smz-document-config';
import { LoginResponse } from './auth/models';
import { HttpBehaviorParameters } from './http/base-api.service';

export class NgxRbkUtilsConfig {
    public debugMode: boolean;
    public applicationName: string;
    public useTitleService?: boolean;
    public diagnostics: {
        url: string;
    };
    public notifications: {
        url: string;
        updateMethod?: 'interval';
        updateRate?: number;
        httpBehavior?: Partial<HttpBehaviorParameters>;
        emptyMessage?: string;
        title?: string;
        rowsPerPage?: number;
        pageOptions?: number[];
        showTypeIndicators?: boolean;
        showRefreshButton?: boolean;
        width?: string;
        styleClass?: string;
        zIndex?: number;
        date?: {
            recentsMethod: 'fromNow' | 'calendar',
            recentsDaysCount: number,
            othersFormat: string;
        };
    };
    public documents?: {
        defaultStyles: SmzDocumentConfig;
    };
    public uiDefinitions: {
        url: string;
        httpBehavior: Partial<HttpBehaviorParameters>;
    };
    public state: {
        database: {[name: string]: DatabaseStateParameters};
        feature: {[name: string]: DatabaseStateParameters};
    };
    public authentication: {
        localStoragePrefix: string;
        login: {
            url: string;
            loadingBehavior: 'global' | 'local' | 'none';
            errorHandlingType: 'toast' | 'dialog' | 'none';
            responsePropertyName: string; // this is used in the login and refresh token endpoint responses
            redirectCallback?: (response: LoginResponse) => void;
        };
        refreshToken: {
            url: string;
            loadingBehavior: 'global' | 'local' | 'none';
            errorHandlingType: 'toast' | 'dialog' | 'none';
            responsePropertyName: string; // this is used in the login and refresh token endpoint responses
            extraProperties?: {[name: string]: string};
        };
        accessTokenClaims?: { claimName: string; propertyName: string; type: 'string' | 'array' } [],
        useWindowsAuthentication?: boolean
    };
    public httpBehaviors: {
        defaultParameters: HttpBehaviorParameters;
    };
    public toastConfig: {
        severity: string;
        life: number;
        sticky: boolean;
        closable: boolean;
        successTitle: string;
        warningTitle: string;
        errorTitle: string;
        infoTitle: string;
        debounceDistinctDelay: number;
    };
    public dialogsConfig: {
        errorDialogTitle: string;
        warningDialogTitle: string;
    };
    public routes: {
        authenticatedRoot: string;
        nonAuthenticatedRoot: string;
        login: string;
        error: string;
    };
}

export interface DatabaseStateParameters {
    state: any;
    loadAction?: any;
    successAction?: any;
    clearFunction: () => {};
    cacheTimeout?: number;
}

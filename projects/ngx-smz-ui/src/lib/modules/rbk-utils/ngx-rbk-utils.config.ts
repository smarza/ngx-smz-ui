import { Store } from '@ngxs/store';
import { SmzAuthorizationUserState } from '../smz-access/modules/users/models/smz-authorization-user-state';
import { SmzDocumentConfig } from '../smz-documents/models/smz-document-config';
import { MenuCreation } from '../smz-layouts/core/models/menu-creation';
import { SmzLoginState } from '../smz-layouts/features/login/login-state';
import { LoginResponse } from './auth/models';
import { CustomError } from './error-handler/error.handler';
import { HttpBehaviorParameters } from './http/base-api.service';
import { SmzUiLocale } from '../../state/database/ui-localization/ui-localization.state';

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
    public uiLocalization: {
        url: string;
        current: string;
        locales: SmzUiLocale[];
        httpBehavior: Partial<HttpBehaviorParameters>;
        allowLocalizationSwitching: boolean;
        isEnabled: boolean;
    };
    public state: {
        database: { [name: string]: DatabaseStateParameters };
        feature: { [name: string]: DatabaseStateParameters };
    };
    public authentication: {
        localStoragePrefix: string;
        authenticatedRoot: string;
        nonAuthenticatedRoot: string;
        allowSuperuser: boolean;
        useSingleTenantAplication: boolean;
        allowTenantSwitching: boolean;
        login: {
            url: string;
            route: string;
            superuserRoute?: string;
            loadingBehavior: 'global' | 'local' | 'none';
            errorHandlingType: 'toast' | 'dialog' | 'none';
            responsePropertyName: string; // this is used in the login and refresh token endpoint responses
            redirectCallback?: (response: LoginResponse) => void;
            superuser: string;
            applicationTenant: string;
            showTenantSelector: boolean;
            page: {
                useSmzLoginModule: boolean;
                state: SmzLoginState<any, any>;
                overrideState: Partial<SmzLoginState<any, any>>;
            }
        };
        refreshToken: {
            url: string;
            loadingBehavior: 'global' | 'local' | 'none';
            errorHandlingType: 'toast' | 'dialog' | 'none';
            responsePropertyName: string; // this is used in the login and refresh token endpoint responses
            extraProperties?: { [name: string]: string };
        };
        accessTokenClaims?: { claimName: string; propertyName: string; type: 'string' | 'array' | 'boolean' }[];
        useWindowsAuthentication?: boolean;
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
    public errorsConfig: {
        page: {
            title: string;
            message: string;
            imagePath: string;
            route: string;
            buttons: {
                isVisible: boolean;
                label?: string;
                styleClass?: string;
                redirectTo?: string;
                callback?: () => void
            }[],
        };
        clearBehaviors: {
            method: 'onError' | 'onRedirect' | 'none';
            globalStates: boolean;
            databaseStates: boolean;
            featuresStates: boolean;
            localStorage: 'appPrefix' | 'none';
            navigationHistory: boolean;
        };
        callback?: (error: CustomError, store: Store) => void
    };
    public authorization: {
        navigationMenu: MenuCreation,
        profileMenu: MenuCreation[],
        allowMultipleRolesPerUser: boolean;
        users: SmzAuthorizationUserState<any>,
        validationSelectors: {
            hasGroupOfClaimAccess: any,
            hasAnyOfClaimAccess: any,
            hasClaimAccess: any
        },
        roles: {
            title?: string;
            router?: {
                path: string,
                claim?: string
            },
            httpBehavior?: Partial<HttpBehaviorParameters>;
            isVisible?: boolean;
        },
        claims: {
            title?: string;
            router?: {
                path: string,
                claim?: string
            },
            httpBehavior?: Partial<HttpBehaviorParameters>;
            isVisible?: boolean;
        },
        tenants: {
            title?: string;
            router?: {
                path: string,
                claim?: string
            },
            httpBehavior?: Partial<HttpBehaviorParameters>;
            isVisible?: boolean;
        }
    }
}

export type RoleBehavior = 'single' | 'multiple';

export interface DatabaseStateParameters {
    state: any;
    loadAction?: any;
    clearAction?: any;
    successAction?: any;
    clearFunction?: () => {};
    cacheTimeout?: number;
}

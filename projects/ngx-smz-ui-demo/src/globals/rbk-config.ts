import { environment } from '../environments/environment';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';

// ------------------------------------------
// DATABASE STATES
//

// ------------------------------------------
// DATABASE ACTIONS
//

// ------------------------------------------
// FEATURE STATES
//

// ------------------------------------------
// DATABASE INITIALS
//

// ------------------------------------------
// FEATURE INITIALS
//

export const rbkConfig: NgxRbkUtilsConfig = {
    debugMode: true,
    applicationName: environment.production ? 'VF' : 'TREINAMENTO',
    useTitleService: true,
    routes: {
        authenticatedRoot: '/home',
        nonAuthenticatedRoot: '/login',
        login: '/login',
        error: '/error'
    },
    uiDefinitions: {
        url: `${environment.backend}/api/ui-definitions`,
        httpBehavior: {
            authentication: false,
            compression: true,
            errorHandlingType: 'dialog',
            loadingBehavior: 'global',
            needToRefreshToken: false
        }
    },
    diagnostics: {
        // url: `${environment.backend}/api/diagnostics`
        url: null
    },
    authentication: {
        login: {
            url: `${environment.backend}/api/auth/login`,
            errorHandlingType: 'toast',
            responsePropertyName: 'accessToken',
            loadingBehavior: 'local',
        },
        localStoragePrefix: 'vf',
        refreshToken: {
            url: `${environment.backend}/api/auth/refresh-token`,
            errorHandlingType: 'toast',
            responsePropertyName: 'refreshToken',
            loadingBehavior: 'global',
        },
        accessTokenClaims: [
            { claimName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', propertyName: 'username', type: 'string' },
        ]
    },
    state: {
        database: {
        },
        feature: {
        },
    },
    httpBehaviors: {
        defaultParameters: {
            compression: true,
            authentication: true,
            needToRefreshToken: true,
            loadingBehavior: 'global',
            errorHandlingType: 'dialog',
            localLoadingTag: null,
            restoreStateOnError: true
        },
    },
    toastConfig: {
        severity: 'success',
        life: 5000,
        sticky: false,
        closable: true,
        successTitle: 'SUCESSO',
        errorTitle: 'ERRO',
        warningTitle: 'ALERTA',
        infoTitle: 'AVISO',
    },
    dialogsConfig: {
        errorDialogTitle: 'ERRO',
        warningDialogTitle: 'ALERTA'
    }
};

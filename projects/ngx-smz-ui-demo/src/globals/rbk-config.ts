import { environment } from '../environments/environment';
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';
import { DemoFeatureName, DemoFeatureState, getInitialState as getFtDemoInitialState } from '../app/state/demo/demo.state';
import { CountriesDbName, CountriesDbState, getInitialState as getDbCountriesInitialState } from '../app/state/database/countries/countries.state';
import { CountriesDbActions } from '../app/state/database/countries/countries.actions';

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
    debugMode: false,
    applicationName: environment.production ? 'VF' : 'TREINAMENTO',
    useTitleService: true,
    routes: {
        authenticatedRoot: '/home',
        nonAuthenticatedRoot: '/login',
        login: '/login',
        error: '/error'
    },
    uiDefinitions: {
        url: `${environment.domainApi}/api/ui-definitions`,
        httpBehavior: {
            authentication: false,
            compression: true,
            errorHandlingType: 'dialog',
            loadingBehavior: 'global',
            needToRefreshToken: false
        }
    },
    diagnostics: {
        // url: `${environment.domainApi}/api/diagnostics`
        url: null
    },
    authentication: {
        login: {
            url: `${environment.authenticationApi}/api/auth/login`,
            errorHandlingType: 'toast',
            responsePropertyName: 'accessToken',
            loadingBehavior: 'global',
        },
        localStoragePrefix: 'dm',
        refreshToken: {
            url: `${environment.authenticationApi}/api/auth/refresh-token`,
            errorHandlingType: 'toast',
            responsePropertyName: 'refreshToken',
            loadingBehavior: 'global',
            extraProperties: { username: '', applicationId: environment.applicationId }
        },
        accessTokenClaims: [
            { claimName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', propertyName: 'username', type: 'string' },
            { claimName: 'rol', propertyName: 'roles', type: 'array' },
            { claimName: 'Picture', propertyName: 'picture', type: 'string' },
        ]
    },
    state: {
        database: {
            [CountriesDbName]: {
                state: CountriesDbState,
                clearFunction: getDbCountriesInitialState,
                cacheTimeout: 10,
                loadAction: CountriesDbActions.LoadAll,
            }
        },
        feature: {
            [DemoFeatureName]: {
                state: DemoFeatureState,
                clearFunction: getFtDemoInitialState
            },
        },
    },
    httpBehaviors: {
        defaultParameters: {
            ignoreErrorHandling: false,
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

import { environment } from '../../environments/environment';
import { CustomError, GlobalInjector, LoginResponse, NgxRbkUtilsConfig, SmzFormBuilder } from 'ngx-smz-ui';
import { DemoFeatureName, DemoFeatureState, getInitialState as getFtDemoInitialState } from '../../app/state/demo/demo.state';
import { CountriesDbName, CountriesDbState, getInitialState as getDbCountriesInitialState } from '../../app/state/database/countries/countries.state';
import { CountriesDbActions } from '../../app/state/database/countries/countries.actions';
import { WarehousesDbName, WarehousesDbState, getInitialState as getDbWarehousesInitialState } from '../../app/state/database/warehouses/warehouses.state';
import { WarehousesDbActions } from '../../app/state/database/warehouses/warehouses.actions';
import { ShopsDbName, ShopsDbState, getInitialState as getDbShopsInitialState } from '../../app/state/database/shops/shops.state';
import { ShopsDbActions } from '../../app/state/database/shops/shops.actions';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { TreeDemoFeatureName, TreeDemoFeatureState, getInitialState as getFtTreeDemoInitialState } from '../../app/state/tree-demo/tree-demo.state';

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
    uiDefinitions: {
        url: `${environment.serverUrl}/api/ui-definitions`,
        httpBehavior: {
            authentication: false,
            compression: true,
            errorHandlingType: 'dialog',
            loadingBehavior: 'global',
            needToRefreshToken: false
        }
    },
    authorization: {
      navigationMenu: null,
      allowMultipleRolesPerUser: false,
      profileMenu: [],
      users: {},
      roles: {},
      claims: {},
      tenants: {}
    },
    diagnostics: {
        // url: `${environment.serverUrl}/api/diagnostics`
        url: null
    },
    notifications: {
        url: null
    },
    authentication: {
        localStoragePrefix: 'ui-demo',
        authenticatedRoot: '/home',
        nonAuthenticatedRoot: '/login',
        allowSuperuser: false,
        useSingleTenantAplication: false,
        allowTenantSwitching: false,
        login: {
            url: `${environment.authenticationApi}/api/authentication/login`,
            route: 'login',
            errorHandlingType: 'toast',
            responsePropertyName: 'accessToken',
            loadingBehavior: 'global',
            superuser: 'superuser',
            applicationTenant: '',
            showTenantSelector: false,
            page: {
                useSmzLoginModule: false,
                state: null,
                overrideState: {}
            }
        },
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
        ],
    },
    state: {
        database: {
            [CountriesDbName]: {
                state: CountriesDbState,
                clearFunction: getDbCountriesInitialState,
                cacheTimeout: 10,
                loadAction: CountriesDbActions.LoadAll,
            },
            [WarehousesDbName]: {
                state: WarehousesDbState,
                cacheTimeout: 60,
                loadAction: WarehousesDbActions.LoadAll,
                clearFunction: getDbWarehousesInitialState
              },
              [ShopsDbName]: {
                state: ShopsDbState,
                cacheTimeout: 60,
                loadAction: ShopsDbActions.LoadAll,
                clearFunction: getDbShopsInitialState
              },
        },
        feature: {
            [DemoFeatureName]: {
                state: DemoFeatureState,
                clearFunction: getFtDemoInitialState
            },
            [TreeDemoFeatureName]: {
                state: TreeDemoFeatureState,
                clearFunction: getFtTreeDemoInitialState
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
            restoreStateOnError: true,
            useWindowsAuthentication: false,
            mockedUserId: null
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
        debounceDistinctDelay: 2000
    },
    dialogsConfig: {
        errorDialogTitle: 'ERRO',
        warningDialogTitle: 'ALERTA'
    },
    errorsConfig: {
        page: {
            route: '/error',
            title: 'Erro',
            message: 'Ocorreu um erro com a sua solicitação. Caso persista, entre em contato com seu administrador de sistema.',
            imagePath: 'assets/images/pages/bg-error.jpg',
            button: {
                isVisible: true,
                label: 'Ir para Login',
                redirectTo: '/login'
            },
        },
        clearBehaviors: {
            method: 'onError',
            globalStates: true,
            databaseStates: true,
            featuresStates: true,
            localStorage: 'appPrefix',
            navigationHistory: true
        },
        callback: (error: CustomError, store: Store) => {
            console.log('error callback', error, store);
        }
    }
};

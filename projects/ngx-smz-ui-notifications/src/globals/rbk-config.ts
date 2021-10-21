import { environment } from '../environments/environment';
import { GlobalInjector, LoginResponse, NgxRbkUtilsConfig } from 'ngx-smz-ui';
import { DemoFeatureName, DemoFeatureState, getInitialState as getFtDemoInitialState } from '../app/state/demo/demo.state';
import { CountriesDbName, CountriesDbState, getInitialState as getDbCountriesInitialState } from '../app/state/database/countries/countries.state';
import { CountriesDbActions } from '../app/state/database/countries/countries.actions';
import { WarehousesDbName, WarehousesDbState, getInitialState as getDbWarehousesInitialState } from '../app/state/database/warehouses/warehouses.state';
import { WarehousesDbActions } from '../app/state/database/warehouses/warehouses.actions';
import { ShopsDbName, ShopsDbState, getInitialState as getDbShopsInitialState } from '../app/state/database/shops/shops.state';
import { ShopsDbActions } from '../app/state/database/shops/shops.actions';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

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
    applicationName: environment.production ? 'Notifications' : 'Notifications DEV',
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
    notifications: {
        url: `${environment.domainApi}/api/notifications`,
        updateMethod: 'interval',
        updateRate: 100000,
        httpBehavior: {
            authentication: true,
            compression: true,
            errorHandlingType: 'toast',
            loadingBehavior: 'none',
            needToRefreshToken: true
        },
        emptyMessage: 'Nenhuma notificação encontrada',
        title: 'Notificações',
        rowsPerPage: 5,
        pageOptions: [5, 10, 20],
        showTypeIndicators: true,
        showRefreshButton: true,
        width: '550px',
        styleClass: '',
        zIndex: 2000,
        date: {
            recentsMethod: 'fromNow',
            recentsDaysCount: 2,
            othersFormat: 'DD/MM/YYYY HH:mm'
        }
    },
    authentication: {
        localStoragePrefix: 'ui-demo',
        login: {
            url: `${environment.authenticationApi}/api/auth/login`,
            errorHandlingType: 'toast',
            responsePropertyName: 'accessToken',
            loadingBehavior: 'global',
            redirectCallback: (response: LoginResponse) => {
                console.log('from callback', response);

                const store = GlobalInjector.instance.get(Store);

                setTimeout(() => {
                    store.dispatch(new Navigate(['ng-dom']));
                }, 3000);
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
        ]
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
            useWindowsAuthentication: false
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
        debounceDistinctDelay: 200
    },
    dialogsConfig: {
        errorDialogTitle: 'ERRO',
        warningDialogTitle: 'ALERTA'
    }
};

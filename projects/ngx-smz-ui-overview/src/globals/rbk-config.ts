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
import { style } from '@angular/animations';

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
    applicationName: environment.production ? 'Overview' : 'Overview DEV',
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
        url: null
    },
    documents: {
        defaultStyles: {
            titles: {
                container: 'p-2 bg-gray-200',
                text: 'text-black text-2xl font-bold',
            },
            dividers: {
                styles: 'p-py-2'
            },
            fields: {
                container: 'p-1 bg-white border border-solid',
                label: 'text-black text-xs',
                text: 'text-black text-base',
            }
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

import { environment } from '../environments/environment';
import { GlobalInjector, LoginResponse, NgxRbkUtilsConfig, CustomError } from 'ngx-smz-ui';
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
    applicationName: environment.production ? 'Overview' : 'Overview DEV',
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
    diagnostics: {
        // url: `${environment.serverUrl}/api/diagnostics`
        url: null
    },
    excels: {
        requestLimit: 4294967295
    },
    notifications: {
        url: null
    },
    documents: {
        defaultStyles: {
            globals: {
                font: {
                    scale: '1rem',
                    family: 'Roboto'
                },
            },
            viewer: {
                container: 'bg-surface-a',
                paper: 'bg-white text-black m-6 shadow-lg border border-solid border-white',
            },
            titles: {
                container: 'bg-gray-200',
                text: 'text-black smz-document-text-2xl font-bold',
            },
            subTitles: {
                container: 'mt-2',
                text: 'text-black smz-document-text-lg font-bold',
            },
            dividers: {
                container: 'py-1'
            },
            fields: {
                container: 'p-1 px-2 smz-document-border',
                label: 'text-black smz-document-text-xs my-1',
                text: 'text-black smz-document-text-base',
            },
            fieldsGroup: {
                container: ''
            },
            images: {
                container: '',
                styles: '',
            },
            tables: {
                container: 'bg-white text-black smz-document-text-base text-left',
                header: {
                    container: '',
                    columns: 'p-1 px-2 smz-document-border bg-gray-200'
                },
                content: 'p-1 px-2 smz-document-border'
            },
            charts: {
                container: ''
            },
            components: {
                container: 'bg-white text-black'
            },
            contents: {
                container: ''
            }
        }
    },
    authentication: {
        localStoragePrefix: 'ui-demo',
        authenticatedRoot: '/home',
        nonAuthenticatedRoot: '/login',
        login: {
            url: `${environment.authenticationApi}/api/auth/login`,
            route: '/login',
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

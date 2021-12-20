import { environment } from '../environments/environment';
import { NgxRbkUtilsConfig, CustomError } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';

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
    applicationName: environment.production ? 'Modules' : 'Modules DEV',
    useTitleService: true,
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
        url: `${environment.domainApi}/api/diagnostics`
    },
    notifications: {
        url: null
    },
    documents: {
        defaultStyles: {
            globals: {
                font: {
                    scale: '0.7rem',
                    family: 'Roboto'
                },
            },
            paper: {
                marginCm: {
                    top: 0.6,
                    left: 0.6,
                    right: 0.6,
                    bottom: 0.6,
                },
                headerHeightCm: null
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
        },
        feature: {
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

import { environment } from '@environments/environment';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationBuilder } from './authentication-builder';
import { SmzUiCrudsBuilder } from './cruds-builder';

export class SmzUiConfigBuilder extends SmzBuilderUtilities<SmzUiConfigBuilder> {
  protected that = this;
  public _state: NgxRbkUtilsConfig = {
    debugMode: false,
    applicationName: 'application',
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
        url: `${environment.serverUrl}/api/diagnostics`
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
            url: `${environment.authenticationApi}/api/authentication/login`,
            route: '/login',
            errorHandlingType: 'toast',
            responsePropertyName: 'accessToken',
            loadingBehavior: 'global',
        },
        refreshToken: {
            url: `${environment.authenticationApi}/api/authentication/refresh-token`,
            errorHandlingType: 'toast',
            responsePropertyName: 'refreshToken',
            loadingBehavior: 'global',
            extraProperties: { tenant: '' }
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
        callback: null
    },
    cruds: {
      users: {},
      roles: {},
      claims: {},
      uns: {},
    }
  };

  constructor() {
    super();
  }

  public setApplicationName(name: string): SmzUiConfigBuilder {
    this._state.applicationName = name;
    return this.that;
  }

  public authentication(): SmzUiAuthenticationBuilder {
    return new SmzUiAuthenticationBuilder(this);
  }

  public cruds(): SmzUiCrudsBuilder {
    return new SmzUiCrudsBuilder(this, this._state);
  }

  public debugMode(): SmzUiConfigBuilder {
    this._state.debugMode = true;
    return this.that;
  }

  public BuildRbkUtils(): NgxRbkUtilsConfig {
    return this._state;
  }
}
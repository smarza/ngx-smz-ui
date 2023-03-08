import { environment } from '@environments/environment';
import { mergeClone } from '../../common/utils/deep-merge';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDialogsConfig } from '../../modules/smz-dialogs/smz-dialogs.config';
import { defaultFormsModuleConfig } from '../../modules/smz-forms/smz-forms.module';
import { defaultSmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/default-smz-layouts.config';
import { SmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/smz-layouts.config';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationBuilder } from './authentication-builder';
import { SmzUiAuthorizationBuilder } from './authorization-builder';
import { SmzUiStatesBuilder } from './states-builder';

export class SmzUiBuilder extends SmzBuilderUtilities<SmzUiBuilder> {
    protected that = this;
    public _state: NgxSmzUiConfig = {
        debugMode: false,
        rbkUtils: {
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
                allowSuperuser: false,
                useSingleTenantAplication: false,
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
                    url: `${environment.authenticationApi}/api/authentication/refresh-token`,
                    errorHandlingType: 'toast',
                    responsePropertyName: 'refreshToken',
                    loadingBehavior: 'global',
                    extraProperties: {}
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
            authorization: {
                navigationMenu: null,
                allowMultipleRolesPerUser: false,
                profileMenu: [],
                users: {},
                roles: {},
                claims: {},
                tenants: {}
            }
        },
        dialogs: {
        },
        layouts: null,
        locale: null
    };

    constructor() {
        super();
        this.setLocale('pt-BR');
    }

    public setDialogsConfigManually(config: SmzDialogsConfig): SmzUiBuilder {
        this._state.dialogs = mergeClone(defaultDialogsModuleConfig, config);
        return this.that;
    }

    public setRbkUtilsConfigManually(config: Partial<NgxRbkUtilsConfig>): SmzUiBuilder {
        this._state.rbkUtils = mergeClone(this._state.rbkUtils, config);
        return this.that;
    }

    public setLayoutsConfigManually(config: SmzLayoutsConfig): SmzUiBuilder {
        this._state.layouts = mergeClone(defaultSmzLayoutsConfig, config);
        return this.that;
    }

    public setApplicationName(name: string): SmzUiBuilder {
        this._state.rbkUtils.applicationName = name;
        return this.that;
    }

    public authentication(): SmzUiAuthenticationBuilder {
        return new SmzUiAuthenticationBuilder(this);
    }

    public authorization(): SmzUiAuthorizationBuilder {
        return new SmzUiAuthorizationBuilder(this, this._state);
    }

    public states(): SmzUiStatesBuilder {
        return new SmzUiStatesBuilder(this);
    }

    public debugMode(): SmzUiBuilder {
        this._state.debugMode = true;
        return this.that;
    }

    public setLocale(language: 'pt-BR' | 'en-US'): SmzUiBuilder {

        switch (language) {
            case 'pt-BR':
                this._state.locale = {
                    code: language,
                    authorization: {
                        tenant: {
                            displayName: 'Domínio'
                        }
                    },
                };

                break;

            case 'en-US':

                this._state.locale = {
                    code: language,
                    authorization: {
                        tenant: {
                            displayName: 'Tenant'
                        }
                    },
                };

                break;

            default:
                break;
        }

        return this;
    }

    public Build(): NgxSmzUiConfig {
        if (this._state.debugMode) {
            console.log(this._state);
        }
        return this._state;
    }
}

const defaultDialogsModuleConfig: SmzDialogsConfig = {
    dialogs: {
        behaviors: {
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            showOkButton: false,
            useAdvancedResponse: false,
            closeOnEscape: false,
            confirmOnEnter: false,
            showHeader: true,
            showFooter: true,
            dismissableMask: false,
            // defaultWidth: '50%',
            contentPadding: '1.5em',
            baseZIndex: 0,
            includeComponentResponses: true,
        },
        builtInButtons: {
            confirmName: 'CONFIRM',
            // confirmClass: 'smz-button-success',
            confirmDependsOnValidation: true,
            cancelName: 'CANCEL',
            cancelClass: 'smz-button-ghost',
            okName: 'OK',
            okDependsOnValidation: false,
            saveName: 'SALVAR',
            saveDependsOnValidation: true
        },
        featureTemplate: {
            extraSmall: { row: 'col-12' }
        },
        dialogTemplate: {
            extraSmall: { row: 'col-12' },
            large: { row: 'col-6' },
        }
    },
    forms: defaultFormsModuleConfig,
    charts: {
        emptyMessage: 'Sem dados para exibir'
    }
};
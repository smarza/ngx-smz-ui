import { environment } from '@environments/environment';
import { mergeClone } from '../../common/utils/deep-merge';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzDialogsConfig } from '../../modules/smz-dialogs/smz-dialogs.config';
import { defaultFormsModuleConfig } from '../../modules/smz-forms/smz-forms.module';
import { SmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/smz-layouts.config';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationBuilder } from './authentication-builder';
import { SmzUiAuthorizationBuilder } from './authorization-builder';
import { SmzUiStatesBuilder } from './states-builder';
import { SmzUiLayoutsBuilder } from './layouts-builder';
import { SmzLoader } from '../../modules/smz-layouts/core/models/loaders';
import { SmzUiErrorsPageBuilder } from './errors-page-builder';
import { TenantAuthenticationSelectors } from '../../state/global/authentication/tenant-authentication.selectors';
import { SmzUiHttpBehaviorsBuilder } from './http-behaviors-builder';
import { SmzUiNotificationsBuilder } from './notifications-builder';

export class SmzUiBuilder extends SmzBuilderUtilities<SmzUiBuilder> {
    protected that = this;
    public _state: NgxSmzUiConfig = {
        debugMode: false,
        legacyMode: false,
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
                    buttons: [],
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
                tenants: {},
                validationSelectors: {
                    hasGroupOfClaimAccess: TenantAuthenticationSelectors.hasGroupOfClaimAccess,
                    hasAnyOfClaimAccess: TenantAuthenticationSelectors.hasAnyOfClaimAccess,
                    hasClaimAccess: TenantAuthenticationSelectors.hasClaimAccess
                },
            }
        },
        dialogs: {
        },
        layouts: {
            loader: {
                type: SmzLoader.CUBE,
                title: 'Carregando...',
                message: 'Please wait, we\'re preparing your data',
            },
        },
        locale: null
    };

    constructor() {
        super();
        this.setLocale('pt-BR');
    }

    public useLegacy(): SmzUiBuilder {
        this._state.legacyMode = true;
        return this.that;
      }

    public setDialogsConfigManually(config: SmzDialogsConfig): SmzUiBuilder {
        this._state.dialogs = mergeClone(defaultDialogsModuleConfig, config);
        return this.that;
    }

    public setRbkUtilsConfigManually(config: Partial<NgxRbkUtilsConfig>): SmzUiBuilder {
        this._state.rbkUtils = mergeClone(this._state.rbkUtils, config);
        return this.that;
    }

    public layouts(config: SmzLayoutsConfig): SmzUiLayoutsBuilder {
        return new SmzUiLayoutsBuilder(this, config);
    }

    public setApplicationName(name: string): SmzUiBuilder {
        this._state.rbkUtils.applicationName = name;
        return this.that;
    }

    public httpBehaviors(): SmzUiHttpBehaviorsBuilder {
        return new SmzUiHttpBehaviorsBuilder(this);
    }

    public notifications(): SmzUiNotificationsBuilder {
        return new SmzUiNotificationsBuilder(this);
    }

    public authentication(): SmzUiAuthenticationBuilder {
        return new SmzUiAuthenticationBuilder(this);
    }

    public authorization<TUserDetails>(): SmzUiAuthorizationBuilder<TUserDetails> {
        return new SmzUiAuthorizationBuilder(this, this._state);
    }

    public errorsPage(): SmzUiErrorsPageBuilder {
        return new SmzUiErrorsPageBuilder(this, this._state);
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
                    translation: {
                        accept: 'Sim',
                        addRule: 'Adicionar Regra',
                        after: 'Depois',
                        apply: 'Aplicar',
                        before: 'Antes',
                        clear: 'Limpar',
                        contains: 'Contem',
                        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                        dayNamesMin: ['D', 'S', 'T', 'Qua', 'Qui', 'Sex', 'Sa'],
                        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                        endsWith: 'Termina com',
                        equals: 'Igual',
                        gt: 'Maior que',
                        gte: 'Maior que ou igual a',
                        is: 'É',
                        isNot: 'Não é',
                        lt: 'Menor que',
                        lte: 'Menor que ou Igual a',
                        matchAll: 'Combina com Todos',
                        matchAny: 'Combina com qualquer',
                        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                        dateFormat: 'dd/mm/yy',
                        firstDayOfWeek: 0,
                        notContains: 'Não contém',
                        notEquals: 'Diferente',
                        reject: 'Não',
                        removeRule: 'Remover Regra',
                        startsWith: 'Começa com',
                        today: 'Hoje',
                        weekHeader: 'Sem',
                        dateIs: 'Igual a',
                        dateAfter: 'Depois de',
                        dateBefore: 'Anterior a',
                        dateIsNot: 'Diferente de'
                      }
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
                    translation: {
                        startsWith: 'Starts with',
                        contains: 'Contains',
                        notContains: 'Not contains',
                        endsWith: 'Ends with',
                        equals: 'Equals',
                        notEquals: 'Not equals',
                        noFilter: 'No Filter',
                        lt: 'Less than',
                        lte: 'Less than or equal to',
                        gt: 'Greater than',
                        gte: 'Greater than or equal to',
                        is: 'Is',
                        isNot: 'Is not',
                        before: 'Before',
                        after: 'After',
                        dateIs: 'Date is',
                        dateIsNot: 'Date is not',
                        dateBefore: 'Date is before',
                        dateAfter: 'Date is after',
                        clear: 'Clear',
                        apply: 'Apply',
                        matchAll: 'Match All',
                        matchAny: 'Match Any',
                        addRule: 'Add Rule',
                        removeRule: 'Remove Rule',
                        accept: 'Yes',
                        reject: 'No',
                        choose: 'Choose',
                        upload: 'Upload',
                        cancel: 'Cancel',
                        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
                        monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        dateFormat: 'mm/dd/yy',
                        firstDayOfWeek: 0,
                        today: 'Today',
                        weekHeader: 'Wk',
                        weak: 'Weak',
                        medium: 'Medium',
                        strong: 'Strong',
                        passwordPrompt: 'Enter a password',
                        emptyMessage: 'No results found',
                        emptyFilterMessage: 'No results found'
                    }
                };

                break;

            default:
                break;
        }

        return this;
    }

    public build(): NgxSmzUiConfig {
        if (this._state.debugMode) {
            console.log(this._state);
        }

        if (this._state.legacyMode) {

            this._state.rbkUtils.authentication.login.page.useSmzLoginModule = false;
            this._state.rbkUtils.authentication.login.showTenantSelector = false;
            this._state.rbkUtils.authentication.allowSuperuser = false;
            this._state.rbkUtils.authentication.allowTenantSwitching = false;
            this._state.rbkUtils.authentication.useSingleTenantAplication = true;

            if (this._state.debugMode) {
                console.log('LEGACY MODE ENABLED.');
                console.log('authentication.login.page.useSmzLoginModule: ', this._state.rbkUtils.authentication.login.page.useSmzLoginModule);
                console.log('authentication.login.showTenantSelector: ', this._state.rbkUtils.authentication.login.showTenantSelector);
                console.log('authentication.allowSuperuser: ', this._state.rbkUtils.authentication.allowSuperuser);
                console.log('authentication.allowTenantSwitching: ', this._state.rbkUtils.authentication.allowTenantSwitching);
                console.log('authentication.useSingleTenantAplication: ', this._state.rbkUtils.authentication.useSingleTenantAplication);
            }
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
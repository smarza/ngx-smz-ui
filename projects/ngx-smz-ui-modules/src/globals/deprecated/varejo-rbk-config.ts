import { GlobalInjector, LoginResponse, NgxRbkUtilsConfig } from 'ngx-smz-ui';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { HOME_PATH, LOGIN_PAGE_PATH } from '@routes';
import { environment } from '@environments/environment';
// NgxRbkUtilsConfig
export const varejoRbkConfig: any = {
  debugMode: false,
  applicationName: 'varejo-demo',
  useTitleService: true,
  uiLocalization: {
    isEnabled: false,
    url: null,
    current: null,
    locales: [],
    httpBehavior: {
      authentication: false,
      compression: true,
      errorHandlingType: 'dialog',
      loadingBehavior: 'global',
      needToRefreshToken: false
    },
    allowLocalizationSwitching: false
  },
  uiDefinitions: {
    isEnabled: true,
    url: `${environment.authenticationApi}/api/ui-definitions`,
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
    tenants: {},
    validationSelectors: {
      hasAnyOfClaimAccess: null,
      hasClaimAccess: null,
      hasGroupOfClaimAccess: null
    }
  },
  authentication: {
    authenticatedRoot: `/${HOME_PATH}`,
    nonAuthenticatedRoot: `/${LOGIN_PAGE_PATH}`,
    allowSuperuser: false,
    useSingleTenantAplication: true,
    allowTenantSwitching: false,
    login: {
      route: LOGIN_PAGE_PATH,
      url: `${environment.authenticationApi}/api/auth/login`,
      errorHandlingType: 'toast',
      responsePropertyName: 'accessToken',
      loadingBehavior: 'local',
      redirectCallback: (response: LoginResponse) =>
      {
        const store = GlobalInjector.instance.get(Store);
        // store.dispatch(new Navigate([SETUP_PATH, { id: response.redirect.setupCode, user: response.redirect.username }]));
      },
      superuser: null,
      applicationTenant: '',
      showTenantSelector: false,
      page: {
        useSmzLoginModule: false,
        state: null,
        overrideState: null
      }
    },
    refreshToken: {
      url: `${environment.authenticationApi}/api/auth/refresh-token`,
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
      errorHandlingType: 'toast',
      localLoadingTag: null,
      restoreStateOnError: true,
      ignoreErrorHandling: false,
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
  documents: {
    defaultStyles: {
      globals: {
        font: {
          scale: '0.7rem',
          family: 'Roboto'
        },
      },
      viewer: {
        container: 'bg-surface-a',
        paper: 'bg-white p-6 m-6 shadow-lg border border-solid border-white',
      },
      contents: {
        container: '',
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
        container: 'p-1 px-2',
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
      charts: {
        container: ''
    },
      components: {
          container: 'bg-white text-black'
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
};

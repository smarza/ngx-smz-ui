import { NgModule, ModuleWithProviders, Injector, ErrorHandler } from '@angular/core';
import { DatabaseStateParameters, NgxRbkUtilsConfig } from './ngx-rbk-utils.config';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TitleService } from './misc/title.service';
import { MessageService } from 'primeng/api';
import { DATABASE_REQUIRED_ACTIONS, DATABASE_STATES } from '../../state/database/database.state';
import { FEATURE_STATES } from '../../state/features/features.state';
import { GlobalInjector } from './misc/global.injector';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpErrorInterceptor } from './error-handler/error.interceptor';
import { GlobalPendingInterceptorService } from './http/global.pending.interceptor';
import { LocalPendingInterceptorService } from './http/local.pending.interceptor';
import { isEmpty } from './utils/utils';
import { getInitialState, UiDefinitionsDbState, UI_DEFINITIONS_STATE_NAME } from '../../state/database/ui-definitions/ui-definitions.state';
import { UiDefinitionsDbActions } from '../../state/database/ui-definitions/ui-definitions.actions';
import { Route, Router, RouteReuseStrategy, Routes } from '@angular/router';
import { CachedRouteReuseStrategy } from './utils/reusable-route';
import { GlobalErrorHandler } from './error-handler/global-error.interceptor';
import { databaseSmzAccessStates, featureSmzAccessStates } from '../smz-access/state/state-parameters';
import { CLAIMS_PATH, ROLES_PATH } from '../smz-access/routes';
import { RolesModule } from '../smz-access/modules/roles/roles.module';
import { ClaimsModule } from '../smz-access/modules/claims/claims.module';

export function getClaimsModule() { return ClaimsModule }

export function getRolesModule() { return RolesModule }

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        TitleService,
        MessageService,
        {
          provide: RouteReuseStrategy,
          useClass: CachedRouteReuseStrategy,
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalPendingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
    ],
})
export class NgxRbkUtilsModule {
    constructor(private router: Router, injector: Injector, private readonly configuration: NgxRbkUtilsConfig) {
        GlobalInjector.instance = injector;

        const newRoutes = [];

        if (configuration.authentication.showAuthPages) {
            newRoutes.push({ path: ROLES_PATH, loadChildren: getRolesModule });
            newRoutes.push({ path: CLAIMS_PATH, loadChildren: getClaimsModule });
        }

        if (newRoutes.length > 0) {


        const gediRoot = getRouteRoot(this.router.config);

        if (gediRoot != null) {

            if (gediRoot.children === null) gediRoot.children = [];

            // publicar rotas dentro da rota com filhos.
            gediRoot.children.push(...newRoutes);
            this.router.resetConfig([...this.router.config]);
        }
        else {
            // publicar rotas na raiz.
            this.router.resetConfig([...newRoutes, ...this.router.config ]);
        }

        }
    }

    public static forRoot(configuration: NgxRbkUtilsConfig): ModuleWithProviders<NgxRbkUtilsModule> {
        // For some reason Angular passes 2x through all Decorators, so we set the arrays
        // only when they're empty

        if (configuration.authentication.showAuthPages) {
            configuration.state.database = { ...configuration.state.database, ...databaseSmzAccessStates };
            configuration.state.feature = { ...configuration.state.feature, ...featureSmzAccessStates };
        }

        if (FEATURE_STATES.length === 0) {
            const states = [];
            for (const stateName of Object.keys(configuration.state.feature)) {
                states.push(configuration.state.feature[stateName].state);

                // if ((configuration.state.feature[stateName].loadAction != null ||
                //         configuration.state.feature[stateName].loadAction != null)) {
                //     throw new Error(`Invalid state configuration for ` + stateName);
                // }
            }
            FEATURE_STATES.push(...states);
        }

        if (DATABASE_STATES.length === 0) {

            if (!isEmpty(configuration.uiDefinitions?.url)) {
                const uiDefinitionsState: DatabaseStateParameters = {
                    state: UiDefinitionsDbState,
                    loadAction: UiDefinitionsDbActions.LoadAll,
                    clearFunction: getInitialState,
                    cacheTimeout: 999
                };

                configuration.state.database[UI_DEFINITIONS_STATE_NAME] = uiDefinitionsState;
            }

            const states = [];
            const requiredActions = [];
            for (const stateName of Object.keys(configuration.state.database)) {
                states.push(configuration.state.database[stateName].state);

                if ((configuration.state.database[stateName].loadAction != null &&
                        configuration.state.database[stateName].loadAction == null) ||
                    (configuration.state.database[stateName].loadAction == null &&
                        configuration.state.database[stateName].loadAction != null)) {
                    throw new Error(`Invalid state configuration for ` + stateName);
                }

                if (configuration.state.database[stateName].loadAction != null) {
                    requiredActions.push(configuration.state.database[stateName].loadAction);
                    requiredActions.push(configuration.state.database[stateName].successAction);
                }
            }
            DATABASE_STATES.push(...states);

            if (requiredActions.length > 0) {
                DATABASE_REQUIRED_ACTIONS.push(...requiredActions);
            }
        }

        return {
            ngModule: NgxRbkUtilsModule,
            providers: [
                {
                    provide: NgxRbkUtilsConfig,
                    useValue: configuration
                }
            ]
        };
    }
}

function getRouteRoot(routes: Routes): Route {

    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];

      if (route.data?.gediRoot === true) {
        return route;
      }
      else if (route.children?.length > 0) {
        const root = getRouteRoot(route.children);

        if (root) {
          return root;
        }
      }

    }

    return null;
  }
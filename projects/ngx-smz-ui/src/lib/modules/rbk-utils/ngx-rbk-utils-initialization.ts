import { Route, Router, Routes } from '@angular/router';
import { GlobalInjector } from '../../common/services/global-injector';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { DATABASE_REQUIRED_ACTIONS, DATABASE_STATES } from '../../state/database/database.state';
import { UiDefinitionsDbActions } from '../../state/database/ui-definitions/ui-definitions.actions';
import { getInitialState, UiDefinitionsDbState, UI_DEFINITIONS_STATE_NAME } from '../../state/database/ui-definitions/ui-definitions.state';
import { FEATURE_STATES } from '../../state/features/features.state';
import { ClaimsModule } from '../smz-access/modules/claims/claims.module';
import { RolesModule } from '../smz-access/modules/roles/roles.module';
import { TenantsModule } from '../smz-access/modules/tenants/tenants.module';
import { UsersModule } from '../smz-access/modules/users/users.module';
import { CLAIMS_PATH, ROLES_PATH, TENANTS_PATH, USERS_PATH } from '../smz-access/routes';
import { DatabaseStateParameters } from './ngx-rbk-utils.config';
import { isEmpty } from './utils/utils';
import { RbkAuthGuard } from './auth/auth.guard';

export function getUsersModule() { return UsersModule }
export function getRolesModule() { return RolesModule }
export function getClaimsModule() { return ClaimsModule }
export function getTenantsModule() { return TenantsModule }

export function runAccessRoutesInitialization(router: Router) {
    const config = GlobalInjector.config;

    const newRoutes = [];

    if (config.rbkUtils.authorization?.users?.isVisible) {
        newRoutes.push({ path: USERS_PATH, loadChildren: getUsersModule });
    }

    if (config.rbkUtils.authorization?.roles?.isVisible) {
        newRoutes.push({ path: ROLES_PATH, loadChildren: getRolesModule });
    }

    if (config.rbkUtils.authorization?.claims?.isVisible) {
        newRoutes.push({ path: CLAIMS_PATH, loadChildren: getClaimsModule });
    }

    if (config.rbkUtils.authorization?.tenants?.isVisible) {
        newRoutes.push({ path: TENANTS_PATH, loadChildren: getTenantsModule });
    }

    if (newRoutes.length > 0) {

        const appRoot = getRouteRoot(router.config);

        if (appRoot != null) {

            if (appRoot.children === null) appRoot.children = [];

            // publicar rotas dentro da rota com filhos.
            appRoot.children.push(...newRoutes);
            router.resetConfig([...router.config]);
        }
        else {
            // publicar rotas na raiz.
            console.warn(`There is no path on the Project Route with the smzUiRoot definition. This can cause redirect issues. To solve, add a flag smzUiRoot: 'true' on the data property of you main route; The one with HomeModule and UiDefinition Required. `);
            router.resetConfig([{ path: '', children: newRoutes, data: { layout: { mode: 'full', contendPadding: '30em' },}, canActivate: [RbkAuthGuard], }, ...router.config]);
        }

    }
}

export function runRbkInitialization() {

    const mainConfig: NgxSmzUiConfig = GlobalInjector.config;
    const configuration = mainConfig.rbkUtils;

    configuration.state.database = { ...configuration.state.database };
    configuration.state.feature = { ...configuration.state.feature };

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

    GlobalInjector.config = mainConfig;
}

function getRouteRoot(routes: Routes): Route {

    for (let index = 0; index < routes.length; index++) {
        const route = routes[index];

        if (route.data?.smzUiRoot === true) {
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
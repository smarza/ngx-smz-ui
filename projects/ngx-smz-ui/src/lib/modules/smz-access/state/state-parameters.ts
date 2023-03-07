import { DatabaseStateParameters } from '../../rbk-utils/ngx-rbk-utils.config';
import { AccessState, ACCESS_STATE_NAME, getAccessInitialState } from './access/access.state';
import { ClaimsActions } from './claims/claims.actions';
import { ClaimsState, CLAIMS_STATE_NAME } from './claims/claims.state';
import { RolesActions } from './roles/roles.actions';
import { RolesState, ROLES_STATE_NAME } from './roles/roles.state';
import { TenantsActions } from './tenants/tenants.actions';
import { TenantsState, TENANTS_STATE_NAME } from './tenants/tenants.state';
import { UsersActions } from './users/users.actions';
import { UsersState, USERS_STATE_NAME } from './users/users.state';

export const databaseSmzAccessStates: {[name: string]: DatabaseStateParameters} = {
  [CLAIMS_STATE_NAME]: {
    state: ClaimsState,
    cacheTimeout: 999,
    loadAction: ClaimsActions.LoadAll,
    clearAction: ClaimsActions.Clear,
  },
  [ROLES_STATE_NAME]: {
    state: RolesState,
    cacheTimeout: 999,
    loadAction: RolesActions.LoadAll,
    clearAction: RolesActions.Clear,
  },
  [USERS_STATE_NAME]: {
    state: UsersState,
    cacheTimeout: 999,
    loadAction: UsersActions.LoadAll,
    clearAction: UsersActions.Clear,
  },
  [TENANTS_STATE_NAME]: {
    state: TenantsState,
    cacheTimeout: 999,
    loadAction: TenantsActions.LoadAll,
    clearAction: TenantsActions.Clear,
  },
};

export const featureSmzAccessStates: {[name: string]: DatabaseStateParameters} = {
  [ACCESS_STATE_NAME]: {
    state: AccessState,
    clearFunction: () => getAccessInitialState(),
  },
};
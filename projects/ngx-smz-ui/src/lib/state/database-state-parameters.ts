import { DatabaseStateParameters } from '../modules/rbk-utils/ngx-rbk-utils.config';
import { ClaimsDbActions } from './database/claims/claims.actions';
import { ClaimsDbState, getDbClaimsInitialState as getDbClaimsInitialState } from './database/claims/claims.state';
import { RolesDbActions } from './database/roles/roles.actions';
import { RolesDbState, getDbRolesInitialState as getDbRolesInitialState } from './database/roles/roles.state';
import { UsersDbActions } from './database/users/users.actions';
import { UsersDbState, getDbUsersInitialState as getDbUsersInitialState } from './database/users/users.state';

export const databaseGediStates: {[name: string]: DatabaseStateParameters} = {
  claims: {
    state: ClaimsDbState,
    cacheTimeout: 999,
    loadAction: ClaimsDbActions.LoadAll,
    clearFunction: getDbClaimsInitialState
  },
  users: {
    state: UsersDbState,
    cacheTimeout: 30,
    loadAction: UsersDbActions.LoadAll,
    clearFunction: getDbUsersInitialState
  },
  roles: {
    state: RolesDbState,
    cacheTimeout: 999,
    loadAction: RolesDbActions.LoadAll,
    clearFunction: getDbRolesInitialState
  },
};
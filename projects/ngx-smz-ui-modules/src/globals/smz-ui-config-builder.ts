import { AuthClaimDefinitions, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { CustomUserTableBuilder } from '../app/functions/custom-user-table-state';
import { showUserCreationDialog } from '../app/functions/show-user-creation-dialog';
import { getFtUsersInitialState, UsersFtState, USERS_FT_STATE_NAME } from '@states/features/users/users.state';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
  .setApplicationName('Modules Demo')
  .setDialogsConfigManually(smzDialogsConfig)
  .layouts(smzLayoutsConfig)
    .builder
  .authentication()
    .mapAccessTokenData('rol', 'roles', 'array')
    .mapAccessTokenData('avatar', 'avatar', 'string')
    .mapAccessTokenData('tenant', 'tenant', 'string')
    .mapAccessTokenData('display-name', 'displayName', 'string')
    .mapAccessTokenData('has-tenant', 'hasTenant', 'boolean')
    .mapAccessTokenData('authentication-mode', 'authenticationMode', 'string')
    .setTenantDisplayName('Domínio')
    .login()
      .useWindowsAuthentication()
      .allowSuperuser()
      .allowTenantSwitching()
      .authorization
    .builder
  .authorization()
    .setMenuLabel('Administrativo')
    .allowMultipleRolesPerUser()
    .users()
      .customTable(CustomUserTableBuilder)
      // .allowUserDeletion()
      .allowUserDeactivation()
      .addButtons()
        .item('Criar Usuário')
          .hasClaimAccess(AuthClaimDefinitions.MANAGE_USERS)
          .setCallback(() => showUserCreationDialog())
          .menu
        .back
      .authorization
    .roles().authorization
    .claims().authorization
    .tenants().authorization
    .builder
  .states()
    .addFeature(USERS_FT_STATE_NAME)
      .setState(UsersFtState)
      .setClearFunction(getFtUsersInitialState)
      .state
    .builder
  ;
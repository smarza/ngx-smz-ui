import { AuthClaimDefinitions, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { CustomUserTableBuilder } from '../app/functions/custom-user-table-state';
import { showUserCreationDialog } from '../app/functions/show-user-creation-dialog';
import { getFtUsersInitialState, UsersFtState, USERS_FT_STATE_NAME } from '@states/features/users/users.state';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
  .setApplicationName('Modules Demo')
  .setDialogsConfigManually(smzDialogsConfig)
  .setLayoutsConfigManually(smzLayoutsConfig)
  .authentication()
    .mapAccessTokenData('rol', 'roles', 'array')
    .mapAccessTokenData('avatar', 'picture', 'string')
    .mapAccessTokenData('tenant', 'tenant', 'string')
    .mapAccessTokenData('display-name', 'displayName', 'string')
    .mapAccessTokenData('has-tenant', 'hasTenant', 'boolean')
    .setTenantDisplayName('Domínio')
    .login()
      // .useSingleTenantAplication('proteus')
      // .useWindowsAuthentication()
      .allowSuperuser()
      .authorization
    .builder
  .authorization()
    .allowMultipleRolesPerUser()
    .users()
      .customTable(CustomUserTableBuilder)
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
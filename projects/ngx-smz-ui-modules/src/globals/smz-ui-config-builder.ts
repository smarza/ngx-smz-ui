import { AuthClaimDefinitions, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { CustomUserTableBuilder } from '../app/functions/custom-user-table-state';
import { showCreateUserWithMultipleRoleDialog } from '../app/functions/create-user-with-multiple-role-dialog';
import { showCreateUserWithSingleRoleDialog } from '../app/functions/create-user-with-single-role-dialog';
import { getFtUsersInitialState, UsersFtState, USERS_FT_STATE_NAME } from '@states/features/users/users.state';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Modules Demo')
.setDialogsConfigManually(smzDialogsConfig)
.setLayoutsConfigManually(smzLayoutsConfig)
.authentication()
  .useTenant('proteus')
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('Picture', 'picture', 'string')
  .builder
.authorization()
  .users()
    .customTable(CustomUserTableBuilder)
    .addButtons()
      .item('Criar')
        .hasClaimAccess(AuthClaimDefinitions.MANAGE_USERS)
        .setCallback(() => {
          showCreateUserWithMultipleRoleDialog();
          showCreateUserWithSingleRoleDialog();
        })
        .menu
      .back
    // Tabela

    // actions da pagina
      // function void()
    // actions no usuário
      // function<T> void(user: T)
    .authorization
  .roles().authorization
  .claims().authorization
  .tenants().hide().authorization
  .builder
.states()
  .addFeature(USERS_FT_STATE_NAME)
    .setState(UsersFtState)
    .setClearFunction(getFtUsersInitialState)
    .state
  .builder
;
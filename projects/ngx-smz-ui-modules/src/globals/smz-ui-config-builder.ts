import { SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';
import { CustomUserTableBuilder } from '../functions/custom-user-table-state';

export const UiConfigBuilder: SmzUiBuilder = new SmzUiBuilder()
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
  .builder
;
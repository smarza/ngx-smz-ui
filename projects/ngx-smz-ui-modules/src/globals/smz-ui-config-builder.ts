import { SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';

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
  .users().authorization
  .roles().authorization
  .claims().authorization
  .tenants().hide().authorization
  .builder
.states()
  .builder
;
import { SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './smz-config';

export const UiConfigBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Modules Demo')
.setDialogsConfigManually(smzDialogsConfig)
.authentication()
  .useTenant('proteus')
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('Picture', 'picture', 'string')
  .builder
.cruds()
  .users().cruds
  .builder
;
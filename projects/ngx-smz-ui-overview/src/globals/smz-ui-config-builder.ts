import { SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './smz-config';
import { rbkConfig } from './rbk-config';

export const UiConfigBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Overview Demo')
.setDialogsConfigManually(smzDialogsConfig)
.setRbkUtilsConfigManually(rbkConfig)
.authentication()
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('Picture', 'picture', 'string')
  .builder
;
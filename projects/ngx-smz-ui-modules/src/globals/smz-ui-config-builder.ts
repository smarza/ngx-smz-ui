import { SmzUiConfigBuilder } from 'ngx-smz-ui';
export const UiConfigBuilder: SmzUiConfigBuilder = new SmzUiConfigBuilder()
.setApplicationName('Modules Demo')
.authentication()
  .useTenant('proteus')
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('Picture', 'picture', 'string')
  .builder
.cruds()
  .users().cruds
  .builder
;
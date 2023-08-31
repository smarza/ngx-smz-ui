import { LegacyAuthenticationSelectors, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { getFtUsersInitialState, UsersFtState, USERS_FT_STATE_NAME } from '@states/features/users/users.state';
import { varejoRbkConfig } from './deprecated/varejo-rbk-config';

export const VarejoUiBuilder: SmzUiBuilder = new SmzUiBuilder()
  .setApplicationName('Modules Demo')
  .setDialogsConfigManually(smzDialogsConfig)
  .setRbkUtilsConfigManually(varejoRbkConfig)
  .layouts(smzLayoutsConfig)
    .builder
  .authentication()
    .setLocalStoragePrefix(`vf_demo`)
    .mapAccessTokenData('rol', 'roles', 'array')
    .mapAccessTokenData('avatar', 'avatar', 'string')
    .mapAccessTokenData('positionId', 'positionId', 'string')
    .mapAccessTokenData('positionName', 'positionName', 'string')
    .mapAccessTokenData('shopId', 'shopId', 'string')
    .mapAccessTokenData('shopName', 'shopName', 'string')
    .mapAccessTokenData('employeeId', 'employeeId', 'string')
    .mapAccessTokenData('employeeName', 'employeeName', 'string')
    .mapAccessTokenData('documents', 'documents', 'array')
    .mapAccessTokenData('queries', 'queries', 'array')
    .mapAccessTokenData('actions', 'events', 'array')
    .mapAccessTokenData('dashboards', 'dashboards', 'array')
    .setTokenResponse('accessToken', 'refreshToken')
    .login()
      .useSingleTenantAplication('')
      .overrideAuthenticationUrl('auth')
      .forceLowercaseUsername()
      .authorization
    .builder
    .authorization()
      .setHasAnyOfClaimAccessSelector(LegacyAuthenticationSelectors.hasAnyOfClaimAccess)
      .setHasClaimAccessSelector(LegacyAuthenticationSelectors.hasClaimAccess)
      .setHasGroupOfClaimAccessSelector(LegacyAuthenticationSelectors.hasGroupOfClaimAccess)
      .builder
  .errorsPage()
    .clearOnError()
    .allowGoToLogin()
    .builder
  .states()
    .addFeature(USERS_FT_STATE_NAME)
      .setState(UsersFtState)
      .setClearFunction(getFtUsersInitialState)
      .state
    .builder
  ;
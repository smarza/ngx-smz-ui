import { SmzLoader, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';
import { CountriesDbName, CountriesDbState, getDbCountriesInitialState } from '@states/database/countries/countries.state';
import { CountriesDbActions } from '@states/database/countries/countries.actions';
import { getDbWarehousesInitialState, WarehousesDbName, WarehousesDbState } from '@states/database/warehouses/warehouses.state';
import { getDbShopsInitialState, ShopsDbName, ShopsDbState } from '@states/database/shops/shops.state';
import { DemoFeatureName, DemoFeatureState, getFtDemoInitialState } from '@states/demo/demo.state';
import { ShopsDbActions } from '@states/database/shops/shops.actions';
import { WarehousesDbActions } from '@states/database/warehouses/warehouses.actions';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { rbkConfig } from './rbk-config';
import { CustomUserTableBuilder } from './custom-user-table-state';
import { AUTHENTICATED_ROOT_PATH } from '@routes';
import { SSO_LOGIN_PATH } from '../app/ui/features/home/login-sso/sso.routes';
import { getSsoAuthInitialState, SSO_AUTH_STATE_NAME, SsoAuthState } from '../app/ui/features/home/login-sso/states/sso-auth.state';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Overview Demo')
.setDialogsConfigManually(smzDialogsConfig) // Temporally
.disableDiagnostics()
.setLocale('pt-BR')
.layouts(smzLayoutsConfig)
  .setLoader(SmzLoader.CUBE)
  .builder
// .setRbkUtilsConfigManually(rbkConfig)
.disableUiDefinitions()
// .notifications()
//   .setUpdateRate(30000)
//   .setItemsPerPage(5)
//   .setPagination([5])
//   .setZIndex(999)
//   .builder
.authentication()
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('avatar', 'avatar', 'string')
  .mapAccessTokenData('tenant', 'tenant', 'string')
  .mapAccessTokenData('display-name', 'displayName', 'string')
  .mapAccessTokenData('has-tenant', 'hasTenant', 'boolean')
  .mapAccessTokenData('authentication-mode', 'authenticationMode', 'string')
  .setTenantDisplayName('Domínio')
  .setAuthenticatedRoot(AUTHENTICATED_ROOT_PATH)
  .setNonAuthenticatedRoot(SSO_LOGIN_PATH) // SSO Customization
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
      .allowUserDeletion()
      .addButtons()
        .item('Criar Usuário')
          .menu
        .back
      .authorization
    .roles().authorization
    .claims().authorization
    .tenants().authorization
    .builder
.states()
  .addDatabase(CountriesDbName)
    .setState(CountriesDbState)
    .setClearFunction(getDbCountriesInitialState)
    .setLoadAction(CountriesDbActions.LoadAll)
    .state
  .addDatabase(WarehousesDbName)
    .setState(WarehousesDbState)
    .setClearFunction(getDbWarehousesInitialState)
    .setLoadAction(WarehousesDbActions.LoadAll)
    .state
  .addDatabase(ShopsDbName)
    .setState(ShopsDbState)
    .setClearFunction(getDbShopsInitialState)
    .setLoadAction(ShopsDbActions.LoadAll)
    .state

    // SSO Customization
    .addFeature(SSO_AUTH_STATE_NAME)
      .setState(SsoAuthState)
      .setClearFunction(getSsoAuthInitialState)
      .state

  .addFeature(DemoFeatureName)
    .setState(DemoFeatureState)
    .setClearFunction(getFtDemoInitialState)
    .setLoadAction(DemoFeatureActions.LoadAll)
    .state
  .builder
;
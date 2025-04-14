import { SmzLoader, SmzUiBuilder } from '@ngx-smz/core';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';
import { CountriesDbName, CountriesDbState, getDbCountriesInitialState } from '../app/state/database/countries/countries.state';
import { CountriesDbActions } from '../app/state/database/countries/countries.actions';
import { getDbWarehousesInitialState, WarehousesDbName, WarehousesDbState } from '../app/state/database/warehouses/warehouses.state';
import { getDbShopsInitialState, ShopsDbName, ShopsDbState } from '../app/state/database/shops/shops.state';
import { DemoFeatureName, DemoFeatureState, getFtDemoInitialState } from '../app/state/demo/demo.state';
import { ShopsDbActions } from '../app/state/database/shops/shops.actions';
import { WarehousesDbActions } from '../app/state/database/warehouses/warehouses.actions';
import { DemoFeatureActions } from '../app/state/demo/demo.actions';
import { CustomUserTableBuilder } from './custom-user-table-state';
import { AUTHENTICATED_ROOT_PATH } from '../routes';
import { SSO_LOGIN_PATH } from '../app/ui/features/home/login-sso/sso.routes';
import { getSsoAuthInitialState, SSO_AUTH_STATE_NAME, SsoAuthState } from '../app/ui/features/home/login-sso/states/sso-auth.state';
import { showUserCreationDialog } from '../app/ui/proteus/functions/show-user-creation-dialog';
import { getInitialProteusState } from '../app/ui/proteus/state/proteus.state';
import { ProteusState } from '../app/ui/proteus/state/proteus.state';
import { PROTEUS_STATE_NAME } from '../app/ui/proteus/state/proteus.state';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Overview Demo')
.setDialogsConfigManually(smzDialogsConfig) // Temporally
.disableDiagnostics()
.setLocale('pt-BR')
.layouts(smzLayoutsConfig)
  .setLoader(SmzLoader.CUBE)
  .builder
// .setRbkUtilsConfigManually(rbkConfig)
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
      .allowUserDeactivation()
      .setAvatarPlaceholder('assets/images/avatar_dark.png')
      .addButtons()
        .item('Criar Usuário')
          .setCallback(() => showUserCreationDialog())
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

  .addFeature(PROTEUS_STATE_NAME)
    .setState(ProteusState)
    .setClearFunction(getInitialProteusState)
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
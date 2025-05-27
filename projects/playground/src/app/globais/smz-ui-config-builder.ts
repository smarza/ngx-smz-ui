import { SmzLoader, SmzUiBuilder } from '@ngx-smz/core';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';

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
  // .setAuthenticatedRoot(AUTHENTICATED_ROOT_PATH)
  // .setNonAuthenticatedRoot(SSO_LOGIN_PATH) // SSO Customization
  // .login()
  //   .useWindowsAuthentication()
  //   .allowSuperuser()
  //   .allowTenantSwitching()
  //   .authorization
  // .builder
// .authorization()
//     .setMenuLabel('Administrativo')
//     .allowMultipleRolesPerUser()
//     .users()
//       .customTable(CustomUserTableBuilder)
//       .allowUserDeactivation()
//       .setAvatarPlaceholder('assets/images/avatar_dark.png')
//       .addButtons()
//         .item('Criar Usuário')
//           .setCallback(() => showUserCreationDialog())
//           .menu
//         .back
//       .authorization
//     .roles().authorization
//     .claims().authorization
//     .tenants().authorization
//     .builder
// .states()
//   .addDatabase(CountriesDbName)
//     .setState(CountriesDbState)
//     .setClearFunction(getDbCountriesInitialState)
//     .setLoadAction(CountriesDbActions.LoadAll)
//     .state
//   .addDatabase(WarehousesDbName)
//     .setState(WarehousesDbState)
//     .setClearFunction(getDbWarehousesInitialState)
//     .setLoadAction(WarehousesDbActions.LoadAll)
//     .state
//   .addDatabase(ShopsDbName)
//     .setState(ShopsDbState)
//     .setClearFunction(getDbShopsInitialState)
//     .setLoadAction(ShopsDbActions.LoadAll)
//     .state

//   .addFeature(PROTEUS_STATE_NAME)
//     .setState(ProteusState)
//     .setClearFunction(getInitialProteusState)
//     .state

//   // SSO Customization
//   .addFeature(SSO_AUTH_STATE_NAME)
//     .setState(SsoAuthState)
//     .setClearFunction(getSsoAuthInitialState)
//     .state

//   .addFeature(DemoFeatureName)
//     .setState(DemoFeatureState)
//     .setClearFunction(getFtDemoInitialState)
//     .setLoadAction(DemoFeatureActions.LoadAll)
//     .state
  .builder
;
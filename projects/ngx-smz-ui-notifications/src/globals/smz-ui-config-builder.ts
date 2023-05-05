import { SmzLoader, SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { CountriesDbName, CountriesDbState, getDbCountriesInitialState } from '@states/database/countries/countries.state';
import { CountriesDbActions } from '@states/database/countries/countries.actions';
import { getDbWarehousesInitialState, WarehousesDbName, WarehousesDbState } from '@states/database/warehouses/warehouses.state';
import { getDbShopsInitialState, ShopsDbName, ShopsDbState } from '@states/database/shops/shops.state';
import { DemoFeatureName, DemoFeatureState, getFtDemoInitialState } from '@states/demo/demo.state';
import { ShopsDbActions } from '@states/database/shops/shops.actions';
import { WarehousesDbActions } from '@states/database/warehouses/warehouses.actions';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { rbkConfig } from './deprecated/rbk-config';

export const UiConfigBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Notification Demo')
.setDialogsConfigManually(smzDialogsConfig) // Temporally
.layouts(smzLayoutsConfig)
  .setLoader(SmzLoader.CUBE)
  .builder
.setRbkUtilsConfigManually(rbkConfig)
.authentication()
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('avatar', 'avatar', 'string')
  .mapAccessTokenData('tenant', 'tenant', 'string')
  .mapAccessTokenData('display-name', 'displayName', 'string')
  .login()
    .useSingleTenantAplication('')
    .overrideAuthenticationUrl('auth')
    .authorization
.builder
.authorization()
  .allowMultipleRolesPerUser()
  .users().allowUserDeactivation().hide().authorization
  .roles().hide().authorization
  .claims().hide().authorization
  .tenants().hide().authorization
  .builder
.errorsPage()
  .clearOnError()
  .allowGoToLogin()
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
  .addFeature(DemoFeatureName)
    .setState(DemoFeatureState)
    .setClearFunction(getFtDemoInitialState)
    .setLoadAction(DemoFeatureActions.LoadAll)
    .state
  .builder
;
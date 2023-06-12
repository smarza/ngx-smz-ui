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

export const UiConfigBuilder: SmzUiBuilder = new SmzUiBuilder()
.setApplicationName('Overview Demo')
.setDialogsConfigManually(smzDialogsConfig) // Temporally
.setLocale('pt-BR')
.layouts(smzLayoutsConfig)
  .setLoader(SmzLoader.CUBE)
  .builder
.setRbkUtilsConfigManually(rbkConfig)
.authentication()
  .mapAccessTokenData('rol', 'roles', 'array')
  .mapAccessTokenData('Picture', 'picture', 'string')
  .login()
    .useSingleTenantAplication('proteus')
    .addToLoginPayload('domain', 'BUZIOS')
    .addToLoginPayload('applicationId', 'SMZ-UI-OVERVIEW')
    .authorization
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
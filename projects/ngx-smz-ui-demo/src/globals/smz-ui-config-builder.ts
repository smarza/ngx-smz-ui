import { SmzUiBuilder } from 'ngx-smz-ui';
import { smzDialogsConfig } from './deprecated/smz-config';
import { smzLayoutsConfig } from './deprecated/smz-layouts.config';
import { DemoFeatureName, DemoFeatureState, getInitialState as getFtDemoInitialState } from '@states/demo/demo.state';
import { TreeDemoFeatureName, TreeDemoFeatureState, getInitialState as getFtTreeDemoInitialState } from '@states/tree-demo/tree-demo.state';
import { CountriesDbName, CountriesDbState, getInitialState as getDbCountriesInitialState } from '@states/database/countries/countries.state';
import { CountriesDbActions } from '@states/database/countries/countries.actions';
import { WarehousesDbName, WarehousesDbState, getInitialState as getDbWarehousesInitialState } from '@states/database/warehouses/warehouses.state';
import { WarehousesDbActions } from '@states/database/warehouses/warehouses.actions';
import { ShopsDbName, ShopsDbState, getInitialState as getDbShopsInitialState } from '@states/database/shops/shops.state';
import { ShopsDbActions } from '@states/database/shops/shops.actions';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
  .setApplicationName('Modules Demo')
  .setDialogsConfigManually(smzDialogsConfig)
  .layouts(smzLayoutsConfig)
    .builder
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
      .state
    .addFeature(TreeDemoFeatureName)
      .setState(TreeDemoFeatureState)
      .setClearFunction(getFtTreeDemoInitialState)
      .state
    .builder
  ;
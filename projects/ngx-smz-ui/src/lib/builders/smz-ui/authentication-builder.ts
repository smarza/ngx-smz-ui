import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiConfigBuilder } from './config-builder';

export class SmzUiAuthenticationBuilder extends SmzBuilderUtilities<SmzUiAuthenticationBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiConfigBuilder) {
    super();
  }

  public useTenant(tenant: string): SmzUiAuthenticationBuilder {
    this._builder._state.authentication.refreshToken.extraProperties.tenant = tenant;
    return this.that;
  }


  public setLocalStoragePrefix(prefix: string): SmzUiAuthenticationBuilder {
    this._builder._state.authentication.localStoragePrefix = prefix;
    return this.that;
  }

  public mapAccessTokenData(from: string, to: string, type: 'array' | 'string'): SmzUiAuthenticationBuilder {
    this._builder._state.authentication.accessTokenClaims.push({ claimName: from, propertyName: to, type });
    return this.that;
  }

  public addToLoginPayload(property: string, value: string): SmzUiAuthenticationBuilder {
    Reflect.set(this._builder._state.authentication.refreshToken.extraProperties, property, value);
    return this.that;
  }

  public get builder(): SmzUiConfigBuilder {
    return this._builder;
  }
}

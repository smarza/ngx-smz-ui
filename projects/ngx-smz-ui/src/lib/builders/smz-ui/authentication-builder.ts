import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiAuthenticationBuilder extends SmzBuilderUtilities<SmzUiAuthenticationBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public useTenant(tenant: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.refreshToken.extraProperties.tenant = tenant;
    return this.that;
  }


  public setLocalStoragePrefix(prefix: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.localStoragePrefix = prefix;
    return this.that;
  }

  public mapAccessTokenData(from: string, to: string, type: 'array' | 'string'): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.accessTokenClaims.push({ claimName: from, propertyName: to, type });
    return this.that;
  }

  public addToLoginPayload(property: string, value: string): SmzUiAuthenticationBuilder {
    Reflect.set(this._builder._state.rbkUtils.authentication.refreshToken.extraProperties, property, value);
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

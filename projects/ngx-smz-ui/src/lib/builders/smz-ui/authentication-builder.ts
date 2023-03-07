import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiAuthenticationBuilder extends SmzBuilderUtilities<SmzUiAuthenticationBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public useTenant(tenant: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.useTenant = true;
    this._builder._state.rbkUtils.authentication.login.tenant = tenant;
    return this.that;
  }

  public allowSuperuser(superuserName: string = 'superuser'): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.allowSuperuser = true;
    this._builder._state.rbkUtils.authentication.login.superuser = superuserName;
    return this.that;
  }

  public showTenantSelector(): SmzUiAuthenticationBuilder {
    if (!this._builder._state.rbkUtils.authentication.useTenant) {
      throw Error(`You need to call useTenant() before call showTenantSelector()`);
    }

    this._builder._state.rbkUtils.authentication.login.showTenantSelector = true;
    return this.that;
  }

  public setLocalStoragePrefix(prefix: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.localStoragePrefix = prefix;
    return this.that;
  }

  public mapAccessTokenData(from: string, to: string, type: 'array' | 'string' | 'boolean'): SmzUiAuthenticationBuilder {
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

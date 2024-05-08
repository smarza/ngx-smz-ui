import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationLoginBuilder } from './authentication-login-builder';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiAuthenticationBuilder extends SmzBuilderUtilities<SmzUiAuthenticationBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public setLocalStoragePrefix(prefix: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.localStoragePrefix = prefix;
    return this.that;
  }

  public setAuthenticatedRoot(path: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.authenticatedRoot = path;
    return this.that;
  }

  public setNonAuthenticatedRoot(path: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.nonAuthenticatedRoot = path;
    this._builder._state.rbkUtils.authentication.login.route = path;
    this._builder._state.rbkUtils.authentication.login.page.useSmzLoginModule = false;
    return this.that;
  }

  public mapAccessTokenData(from: string, to: string, type: 'array' | 'string' | 'boolean'): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.accessTokenClaims.push({ claimName: from, propertyName: to, type });
    return this.that;
  }

  public setTokenResponse(token: string, refreshToken: string): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.login.responsePropertyName = token;
    this._builder._state.rbkUtils.authentication.refreshToken.responsePropertyName = refreshToken;
    return this.that;
  }

  public login(): SmzUiAuthenticationLoginBuilder {
    return new SmzUiAuthenticationLoginBuilder(this, this._builder._state);
  }

  public setTenantDisplayName(name: string): SmzUiAuthenticationBuilder {
    this._builder._state.locale.authorization.tenant.displayName = name;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

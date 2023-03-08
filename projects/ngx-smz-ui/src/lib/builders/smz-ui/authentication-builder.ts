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

  public mapAccessTokenData(from: string, to: string, type: 'array' | 'string' | 'boolean'): SmzUiAuthenticationBuilder {
    this._builder._state.rbkUtils.authentication.accessTokenClaims.push({ claimName: from, propertyName: to, type });
    return this.that;
  }

  public useLoginModule(): SmzUiAuthenticationLoginBuilder {
    return new SmzUiAuthenticationLoginBuilder(this, this._builder._state);
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

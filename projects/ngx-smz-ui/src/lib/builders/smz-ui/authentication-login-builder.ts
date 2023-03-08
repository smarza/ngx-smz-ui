import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationBuilder } from './authentication-builder';

export class SmzUiAuthenticationLoginBuilder extends SmzBuilderUtilities<SmzUiAuthenticationLoginBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiAuthenticationBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._state.rbkUtils.authentication.login.page.useSmzLoginModule = true;
    this._state.rbkUtils.authentication.login.showTenantSelector = true;
  }

  public useSingleTenantAplication(tenant: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.useSingleTenantAplication = true;
    this._state.rbkUtils.authentication.login.applicationTenant = tenant;
    this._state.rbkUtils.authentication.login.showTenantSelector = false;
    return this.that;
  }

  public allowSuperuser(superuserName: string = 'superuser'): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.allowSuperuser = true;
    this._state.rbkUtils.authentication.login.superuser = superuserName;
    return this.that;
  }

  public addToLoginPayload(property: string, value: string): SmzUiAuthenticationLoginBuilder {
    Reflect.set(this._state.rbkUtils.authentication.refreshToken.extraProperties, property, value);
    return this.that;
  }

  public get authorization(): SmzUiAuthenticationBuilder {
    return this._builder;
  }
}

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

  public setMessage(message: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.page.overrideState.message = message;
    return this.that;
  }

  public setLoginButtonLabel(label: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.page.overrideState.loginButtonLabel = label;
    return this.that;
  }

  public setExtraInfo(extraInfo: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.page.overrideState.extraInfo = extraInfo;
    return this.that;
  }


  public setLogoType(type: 'horizontal' | 'vertical' | 'icon' | 'typo'): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.page.overrideState.logo.type = type;
    return this.that;
  }

  public useCustomLogo(imagePath: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.page.overrideState.logo.customPath = imagePath;
    return this.that;
  }

  public setLogoSize(sizes: 'small' | 'medium' | 'large' | 'hero'): SmzUiAuthenticationLoginBuilder {
    switch (sizes) {
      case 'small':
        this._state.rbkUtils.authentication.login.page.overrideState.logo.styleClass = 'w-1/4';
        break;
      case 'medium':
        this._state.rbkUtils.authentication.login.page.overrideState.logo.styleClass = 'w-2/5 ';
        break;
      case 'large':
        this._state.rbkUtils.authentication.login.page.overrideState.logo.styleClass = 'w-3/5 ';
        break;
      case 'hero':
        this._state.rbkUtils.authentication.login.page.overrideState.logo.styleClass = 'w-full';
        break;
    }
    return this.that;
  }

  public get authorization(): SmzUiAuthenticationBuilder {
    return this._builder;
  }
}

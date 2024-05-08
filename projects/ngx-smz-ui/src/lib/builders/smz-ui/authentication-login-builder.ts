import { environment } from '@environments/environment';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthenticationBuilder } from './authentication-builder';
import { LoginResponse } from '../../modules/rbk-utils/auth/models';
import { SmzGenericMenuBuilder } from '../smz-menu/generic-menu-builder';

export class SmzUiAuthenticationLoginBuilder extends SmzBuilderUtilities<SmzUiAuthenticationLoginBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiAuthenticationBuilder, private _state: NgxSmzUiConfig) {
    super();

    if (this._state.rbkUtils.authentication.nonAuthenticatedRoot == '/login') {
      this._state.rbkUtils.authentication.login.page.useSmzLoginModule = true;
    }

    this._state.rbkUtils.authentication.login.showTenantSelector = true;
  }

  public overrideAuthenticationUrl(path: string = 'authentication'): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.url = `${environment.authenticationApi}/api/${path}/login`;
    this._state.rbkUtils.authentication.refreshToken.url = `${environment.authenticationApi}/api/${path}/refresh-token`;
    return this.that;
  }

  public useSingleTenantAplication(tenant: string): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.useSingleTenantAplication = true;
    this._state.rbkUtils.authentication.login.applicationTenant = tenant;
    this._state.rbkUtils.authentication.login.showTenantSelector = false;
    return this.that;
  }

  public useWindowsAuthentication(): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.useWindowsAuthentication = true;
    return this.that;
  }

  public forceLowercaseUsername(): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.forceLowercaseUsername = true;
    return this.that;
  }

  public allowSuperuser(superuserName: string = 'superuser', route: string = 'admin'): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.allowSuperuser = true;
    this._state.rbkUtils.authentication.login.superuser = superuserName;
    this._state.rbkUtils.authentication.login.superuserRoute = route;
    return this.that;
  }

  public allowTenantSwitching(): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.allowTenantSwitching = true;
    this._state.rbkUtils.authentication.accessTokenClaims.push({ claimName: 'allowed-tenants', propertyName: 'allowedTenants', type: 'array' });
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

    if (this._state.rbkUtils.authentication.login.page.overrideState.logo == null) {
      this._state.rbkUtils.authentication.login.page.overrideState.logo = { type: 'horizontal', styleClass: 'w-3/5 ' }
    }

    this._state.rbkUtils.authentication.login.page.overrideState.logo.type = type;
    return this.that;
  }

  public useCustomLogo(imagePath: string): SmzUiAuthenticationLoginBuilder {

    if (this._state.rbkUtils.authentication.login.page.overrideState.logo == null) {
      this._state.rbkUtils.authentication.login.page.overrideState.logo = { type: 'horizontal', styleClass: 'w-3/5 ' }
    }

    this._state.rbkUtils.authentication.login.page.overrideState.logo.customPath = imagePath;
    return this.that;
  }

  public setLogoSize(sizes: 'small' | 'medium' | 'large' | 'hero'): SmzUiAuthenticationLoginBuilder {

    if (this._state.rbkUtils.authentication.login.page.overrideState.logo == null) {
      this._state.rbkUtils.authentication.login.page.overrideState.logo = { type: 'horizontal', styleClass: 'w-3/5 ' }
    }

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

  public setBackground(styleClass: string): SmzUiAuthenticationLoginBuilder {

    if (this._state.rbkUtils.authentication.login.page.overrideState.styleClass == null) {
      this._state.rbkUtils.authentication.login.page.overrideState.styleClass = { background: 'bg-primary-color', card: 'bg-surface-overlay' };
    }

    this._state.rbkUtils.authentication.login.page.overrideState.styleClass.background = styleClass;
    return this.that;
  }

  public setCard(styleClass: string): SmzUiAuthenticationLoginBuilder {

    if (this._state.rbkUtils.authentication.login.page.overrideState.styleClass == null) {
      this._state.rbkUtils.authentication.login.page.overrideState.styleClass = { background: 'bg-primary-color', card: 'bg-surface-overlay' };
    }

    this._state.rbkUtils.authentication.login.page.overrideState.styleClass.card = styleClass;
    return this.that;
  }

  public setRedirectCallback(callback: (response: LoginResponse) => void): SmzUiAuthenticationLoginBuilder {
    this._state.rbkUtils.authentication.login.redirectCallback = callback;
    return this.that;
  }

  public addButtons(): SmzGenericMenuBuilder<SmzUiAuthenticationLoginBuilder> {
    return new SmzGenericMenuBuilder(this, this._state.rbkUtils.authentication.login.page.customButtons);
  }

  public get authorization(): SmzUiAuthenticationBuilder {
    return this._builder;
  }
}

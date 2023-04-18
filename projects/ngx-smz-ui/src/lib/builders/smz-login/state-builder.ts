import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';
import { AuthenticationActions } from '../../state/global/authentication/authentication.actions';
import { SmzControlType } from '../../modules/smz-forms/models/control-types';
import { SmzForm } from '../../modules/smz-forms/models/smz-forms';
import { SmzLoginState } from '../../modules/smz-layouts/features/login/login-state';
import { GlobalInjector } from '../../common/services/global-injector';

export class SmzLoginBuilder<TResponse, TPayload> {
  public _state: SmzLoginState<TResponse, TPayload> = {
    isDebug: false,
    message: null,
    loginButtonLabel: 'ENTRAR',
    extraInfo: null,
    logo: {
      type: 'vertical',
      styleClass: '',
      customPath: null
    },
    form: {
      formId: 'smz-ui-login-form',
      behaviors: { flattenResponse: false, submitOnEnter: true },
      groups: [
        {
          name: null,
          showName: true,
          children: [
            {
              propertyName: 'username', type: SmzControlType.TEXT, name: 'Usuário',
              validatorsPreset: { isRequired: true },
              template: { extraSmall: { row: 'col-12' } }
            },
            {
              propertyName: 'password', type: SmzControlType.PASSWORD, name: 'Senha',
              feedback: false,
              toggleMask: false,
              promptLabel: 'Digite a senha',
              weakLabel: 'Fraca',
              mediumLabel: 'Moderada',
              strongLabel: 'Forte',
              mediumRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
              strongRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,}).',
              validatorsPreset: { isRequired: true },
              template: { extraSmall: { row: 'col-12' } }
            }
          ],
          template: { extraSmall: { row: 'col-12' } }
        }
      ],
    },
    isFormVisible: true,
    callbacks: {
      payload: (response: TResponse) => (null),
      submit: (response: TResponse) => { }
    },
    isAuthenticatedSelector: AuthenticationSelectors.isAuthenticated,
    actions: {
      logout: AuthenticationActions.Logout,
      login: AuthenticationActions.RemoteLogin
    },
    styleClass: {
      background: 'bg-primary-color',
      card: 'bg-surface-overlay'
    }
  };

  constructor() {
    this.setLogoSize('medium');
  }

  public setMessage(message: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.message = message;
    return this;
  }

  public setLoginButtonLabel(label: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.loginButtonLabel = label;
    return this;
  }

  public setExtraInfo(extraInfo: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.extraInfo = extraInfo;
    return this;
  }

  public setPayloadCallback(callback: (response: TResponse) => TPayload): SmzLoginBuilder<TResponse, TPayload> {
    this._state.callbacks.payload = callback;
    return this;
  }

  public setSubmitCallback(callback: (response: TResponse) => void): SmzLoginBuilder<TResponse, TPayload> {
    this._state.callbacks.submit = callback;
    return this;
  }

  public setLogoType(type: 'horizontal' | 'vertical' | 'icon' | 'typo'): SmzLoginBuilder<TResponse, TPayload> {
    this._state.logo.type = type;
    return this;
  }

  public useCustomLogo(imagePath: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.logo.customPath = imagePath;
    return this;
  }

  public setLogoSize(sizes: 'small' | 'medium' | 'large' | 'hero'): SmzLoginBuilder<TResponse, TPayload> {
    switch (sizes) {
      case 'small':
        this._state.logo.styleClass = 'w-1/4';
        break;
      case 'medium':
        this._state.logo.styleClass = 'w-2/5 ';
        break;
      case 'large':
        this._state.logo.styleClass = 'w-3/5 ';
        break;
      case 'hero':
        this._state.logo.styleClass = 'w-full';
        break;
    }
    return this;
  }

  public debugMode(): SmzLoginBuilder<TResponse, TPayload> {
    this._state.isDebug = true;
    return this;
  }

  public setForm(form: SmzForm<TResponse>): SmzLoginBuilder<TResponse, TPayload> {
    this._state.form = form;
    return this;
  }

  public setLogoutAction(action: any, redirection: string = GlobalInjector.config.rbkUtils.authentication.login.route): SmzLoginBuilder<TResponse, TPayload> {
    this._state.actions.logout = action;
    this._state.logoutRedirection = redirection;
    return this;
  }

  public setLoginAction(action: any): SmzLoginBuilder<TResponse, TPayload> {
    this._state.actions.login = action;
    return this;
  }

  public setBackground(styleClass: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.styleClass.background = styleClass;
    return this;
  }

  public setCard(styleClass: string): SmzLoginBuilder<TResponse, TPayload> {
    this._state.styleClass.card = styleClass;
    return this;
  }

  public build(): SmzLoginState<TResponse, TPayload> {

    if (this._state.isDebug) {
      console.log(this._state);
    }

    return this._state;
  }
}
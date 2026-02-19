import { Store } from '@ngxs/store';
import { CustomError } from '../../modules/rbk-utils/error-handler/error.handler';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiErrorsPageBuilder extends SmzBuilderUtilities<SmzUiErrorsPageBuilder> {
  protected override that = this;
  constructor(private _builder: SmzUiBuilder, private _state: NgxSmzUiConfig) {
    super();
  }

  public setRoute(route: string): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.route = route;
    return this.that;
  }

  public setTitle(title: string): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.title = title;
    return this.that;
  }

  public setMessage(message: string): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.message = message;
    return this.that;
  }

  public setImage(path: string): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.imagePath = path;
    return this.that;
  }

  public hookOnError(callback: (error: CustomError, store: Store) => void): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.callback = callback;
    return this.that;
  }

  public disableClear(): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.clearBehaviors.method = 'none';
    return this.that;
  }

  public clearOnError(): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.clearBehaviors.method = 'onError';
    return this.that;
  }

  public clearOnRedirect(): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.clearBehaviors.method = 'onRedirect';
    return this.that;
  }

  public keepNavigationHistory(): SmzUiErrorsPageBuilder {
    if (this._state.rbkUtils.errorsConfig.clearBehaviors.method === 'none') {
      throw Error(`You can´t call 'keepNavigationHistory()' while ClearBehavior is Disabled on the Errors Page Configuration.`);
    }
    this._state.rbkUtils.errorsConfig.clearBehaviors.navigationHistory = false;
    return this.that;
  }

  public keepStates(): SmzUiErrorsPageBuilder {
    if (this._state.rbkUtils.errorsConfig.clearBehaviors.method === 'none') {
      throw Error(`You can´t call 'keepStates()' while ClearBehavior is Disabled on the Errors Page Configuration.`);
    }
    this._state.rbkUtils.errorsConfig.clearBehaviors.globalStates = false;
    this._state.rbkUtils.errorsConfig.clearBehaviors.databaseStates = false;
    this._state.rbkUtils.errorsConfig.clearBehaviors.featuresStates = false;
    return this.that;
  }

  public allowGoToLogin(label: string = 'Ir para Login', styleClass: string = 'p-button-lg p-button-ghost'): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.buttons.push({
      isVisible: () => true,
      label,
      styleClass,
      redirectTo: this._state.rbkUtils.authentication.nonAuthenticatedRoot
    });

    return this.that;
  }

  public addCallbackButton(label: string, callback: () => void, styleClass: string = 'p-button-lg p-button-ghost'): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.buttons.push({
      isVisible: () => true,
      label,
      styleClass,
      callback
    });

    return this.that;
  }

  public addRouteButton(label: string, redirectTo: string, styleClass: string = 'p-button-lg p-button-ghost'): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.buttons.push({
      isVisible: () => true,
      label,
      styleClass,
      redirectTo
    });

    return this.that;
  }

  public addButtonWithCondition(label: string, condition: () => boolean, callback: () => void, styleClass: string = 'p-button-lg p-button-ghost'): SmzUiErrorsPageBuilder {
    this._state.rbkUtils.errorsConfig.page.buttons.push({
      isVisible: condition,
      label,
      styleClass,
      callback
    });

    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

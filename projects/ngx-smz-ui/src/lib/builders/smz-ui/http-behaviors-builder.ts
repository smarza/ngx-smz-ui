import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiHttpBehaviorsBuilder extends SmzBuilderUtilities<SmzUiHttpBehaviorsBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public useErrorToastNotifications(): SmzUiHttpBehaviorsBuilder {
    this._builder._state.rbkUtils.httpBehaviors.defaultParameters.errorHandlingType = 'toast';
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

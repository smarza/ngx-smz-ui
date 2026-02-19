import { DatabaseStateParameters } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiStatesBuilder } from './states-builder';

export class SmzUiFeatureStateBuilder extends SmzBuilderUtilities<SmzUiFeatureStateBuilder> {
  protected override that = this;

  constructor(private _builder: SmzUiStatesBuilder, private _parameter: DatabaseStateParameters) {
    super();

    _parameter.cacheTimeout = 60;
  }

  public setState(state: any): SmzUiFeatureStateBuilder {
    this._parameter.state = state;
    return this.that;
  }

  public setClearFunction(callback: () => {}): SmzUiFeatureStateBuilder {
    this._parameter.clearFunction = callback;
    return this.that;
  }

  public setClearAction(action: any): SmzUiFeatureStateBuilder {
    this._parameter.clearAction = action;
    return this.that;
  }

  public setLoadAction(action: any): SmzUiFeatureStateBuilder {
    this._parameter.loadAction = action;
    return this.that;
  }

  public overrideCacheTimeout(minutes: number): SmzUiFeatureStateBuilder {
    this._parameter.cacheTimeout = minutes;
    return this.that;
  }

  public get state(): SmzUiStatesBuilder {
    return this._builder;
  }
}

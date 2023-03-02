import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { DatabaseStateParameters } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiCrudsBuilder } from './cruds-builder';
import { SmzUiStatesBuilder } from './states-builder';

export class SmzUiFeatureStateBuilder extends SmzBuilderUtilities<SmzUiFeatureStateBuilder> {
  protected that = this;

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

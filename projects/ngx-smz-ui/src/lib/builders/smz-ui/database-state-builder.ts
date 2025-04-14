import { DatabaseStateParameters } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiStatesBuilder } from './states-builder';

export class SmzUiDatabaseStateBuilder extends SmzBuilderUtilities<SmzUiDatabaseStateBuilder> {
  protected override that = this;

  constructor(private _builder: SmzUiStatesBuilder, private _parameter: DatabaseStateParameters) {
    super();

    _parameter.cacheTimeout = 999;
  }

  public setState(state: any): SmzUiDatabaseStateBuilder {
    this._parameter.state = state;
    return this.that;
  }

  public setClearFunction(callback: () => {}): SmzUiDatabaseStateBuilder {
    this._parameter.clearFunction = callback;
    return this.that;
  }

  public setClearAction(action: any): SmzUiDatabaseStateBuilder {
    this._parameter.clearAction = action;
    return this.that;
  }

  public setLoadAction(action: any): SmzUiDatabaseStateBuilder {
    this._parameter.loadAction = action;
    return this.that;
  }

  public overrideCacheTimeout(minutes: number): SmzUiDatabaseStateBuilder {
    this._parameter.cacheTimeout = minutes;
    return this.that;
  }

  public get state(): SmzUiStatesBuilder {
    return this._builder;
  }
}

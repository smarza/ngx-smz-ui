import { DatabaseStateParameters } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiDatabaseStateBuilder } from './database-state-builder';
import { SmzUiFeatureStateBuilder } from './feature-state-builder';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiStatesBuilder extends SmzBuilderUtilities<SmzUiStatesBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public useCodeGenerator(AUTOGENERATED_DATABASE_STATES: any): SmzUiStatesBuilder {
    this._builder._state.rbkUtils.state.database = { ...this._builder._state.rbkUtils.state.database, ...AUTOGENERATED_DATABASE_STATES }
    return this.that;
  }

  public addDatabase(name: string): SmzUiDatabaseStateBuilder {
    const parameter: DatabaseStateParameters = { state: null };
    this._builder._state.rbkUtils.state.database[name] = parameter;
    return new SmzUiDatabaseStateBuilder(this, parameter);
  }

  public addFeature(name: string): SmzUiFeatureStateBuilder {
    const parameter: DatabaseStateParameters = { state: null };
    this._builder._state.rbkUtils.state.feature[name] = parameter;
    return new SmzUiFeatureStateBuilder(this, parameter);
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}
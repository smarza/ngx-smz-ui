import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiConfigBuilder } from './config-builder';
import { SmzUiUsersCrudBuilder } from './crud-users-builder';

export class SmzUiCrudsBuilder extends SmzBuilderUtilities<SmzUiCrudsBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiConfigBuilder, private _state: NgxRbkUtilsConfig) {
    super();
  }

  public users(): SmzUiUsersCrudBuilder {
    return new SmzUiUsersCrudBuilder(this, this._state);
  }

  public get builder(): SmzUiConfigBuilder {
    return this._builder;
  }
}

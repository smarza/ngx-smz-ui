import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiClaimsCrudBuilder } from './crud-claims-builder';
import { SmzUiRolesCrudBuilder } from './crud-roles-builder';
import { SmzUiUsersCrudBuilder } from './crud-users-builder';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiCrudsBuilder extends SmzBuilderUtilities<SmzUiCrudsBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder, private _state: NgxSmzUiConfig) {
    super();
  }

  public users(): SmzUiUsersCrudBuilder {
    return new SmzUiUsersCrudBuilder(this, this._state);
  }

  public roles(): SmzUiRolesCrudBuilder {
    return new SmzUiRolesCrudBuilder(this, this._state);
  }

  public claims(): SmzUiClaimsCrudBuilder {
    return new SmzUiClaimsCrudBuilder(this, this._state);
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}

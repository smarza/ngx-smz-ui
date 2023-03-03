import { databaseSmzAccessStates, featureSmzAccessStates } from '../../modules/smz-access/state/state-parameters';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiClaimsCrudBuilder } from './crud-claims-builder';
import { SmzUiRolesCrudBuilder } from './crud-roles-builder';
import { SmzUiTenantCrudBuilder } from './crud-tenant-builder';
import { SmzUiUsersCrudBuilder } from './crud-users-builder';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiAuthorizationBuilder extends SmzBuilderUtilities<SmzUiAuthorizationBuilder> {
  protected that = this;
  public _menuLocation: 'navigation-bar' | 'profile' = 'navigation-bar';
  public _menu: MenuCreation;
  constructor(private _builder: SmzUiBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._state.rbkUtils.state.database = { ...this._state.rbkUtils.state.database, ...databaseSmzAccessStates }
    this._state.rbkUtils.state.feature = { ...this._state.rbkUtils.state.feature, ...featureSmzAccessStates }

    this._menu = { label: 'Cadastros', icon: 'fa-solid fa-user-gear', items: [] };

  }

  public overrideMenu(location: 'navigation-bar' | 'profile', partial: Partial<MenuCreation> = {}): SmzUiAuthorizationBuilder {
    this._menuLocation = location;
    this._menu = { ...this._menu, ...partial };
    return this.that;
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

  public tenants(): SmzUiTenantCrudBuilder {
    return new SmzUiTenantCrudBuilder(this, this._state);
  }

  public get builder(): SmzUiBuilder {
    if (this._menuLocation === 'navigation-bar') {
      this._state.rbkUtils.authorization.navigationMenu = this._menu;
    }

    return this._builder;
  }
}
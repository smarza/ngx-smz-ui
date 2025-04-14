import { databaseSmzAccessStates, featureSmzAccessStates } from '../../modules/smz-access/state/state-parameters';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiClaimsCrudBuilder } from './crud-claims-builder';
import { SmzUiRolesCrudBuilder } from './crud-roles-builder';
import { SmzUiTenantCrudBuilder } from './crud-tenant-builder';
import { SmzUiUsersCrudBuilder } from './crud-users-builder';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiAuthorizationBuilder<TData> extends SmzBuilderUtilities<SmzUiAuthorizationBuilder<TData>> {
  protected override that = this;
  public _menuLocation: 'navigation-bar' | 'profile' = 'navigation-bar';
  public _menu: MenuCreation;
  constructor(private _builder: SmzUiBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._state.rbkUtils.state.database = { ...this._state.rbkUtils.state.database, ...databaseSmzAccessStates }
    this._state.rbkUtils.state.feature = { ...this._state.rbkUtils.state.feature, ...featureSmzAccessStates }

    this._menu = { label: 'Admin', icon: 'fa-solid fa-user-gear', items: [] };

  }

  public setMenuLabel(label: string): SmzUiAuthorizationBuilder<TData> {
    this._menu.label = label;
    return this.that;
  }

  public overrideMenu(location: 'navigation-bar' | 'profile', partial: Partial<MenuCreation> = {}): SmzUiAuthorizationBuilder<TData> {
    this._menuLocation = location;
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public allowMultipleRolesPerUser(): SmzUiAuthorizationBuilder<TData> {
    this._builder._state.rbkUtils.authorization.allowMultipleRolesPerUser = true;
    return this.that;
  }

  public users(): SmzUiUsersCrudBuilder<TData> {
    return new SmzUiUsersCrudBuilder(this, this._state);
  }

  public roles(): SmzUiRolesCrudBuilder<TData> {
    return new SmzUiRolesCrudBuilder(this, this._state);
  }

  public claims(): SmzUiClaimsCrudBuilder<TData> {
    return new SmzUiClaimsCrudBuilder(this, this._state);
  }

  public tenants(): SmzUiTenantCrudBuilder<TData> {
    return new SmzUiTenantCrudBuilder(this, this._state);
  }

  public setHasGroupOfClaimAccessSelector(selector: any): SmzUiAuthorizationBuilder<TData> {
    this._builder._state.rbkUtils.authorization.validationSelectors.hasGroupOfClaimAccess = selector;
    return this.that;
  }

  public setHasAnyOfClaimAccessSelector(selector: any): SmzUiAuthorizationBuilder<TData> {
    this._builder._state.rbkUtils.authorization.validationSelectors.hasAnyOfClaimAccess = selector;
    return this.that;
  }

  public setHasClaimAccessSelector(selector: any): SmzUiAuthorizationBuilder<TData> {
    this._builder._state.rbkUtils.authorization.validationSelectors.hasClaimAccess = selector;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    if (this._menuLocation === 'navigation-bar' && this._menu.items.length > 0) {
      this._state.rbkUtils.authorization.navigationMenu = this._menu;
    }

    return this._builder;
  }
}

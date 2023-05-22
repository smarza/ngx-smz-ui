import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';
import { USERS_PAGE_ROUTE, USERS_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';
import { SmzTableBuilder } from '../smz-tables/state-builder';
import { SmzAuthorizationUserState } from '../../modules/smz-access/modules/users/models/smz-authorization-user-state';
import { SmzGenericMenuBuilder } from '../smz-menu/generic-menu-builder';
import { SmzMenuItem } from '../../modules/smz-menu/models/smz-menu-item';

export class SmzUiUsersCrudBuilder<TData> extends SmzBuilderUtilities<SmzUiUsersCrudBuilder<TData>> {
  protected that = this;
  private _config: SmzAuthorizationUserState<TData>;
  private _menu: MenuCreation;

  constructor(private _builder: SmzUiAuthorizationBuilder<TData>, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      table: {
        customBuilder: null,
        useDefaultMenu: true
      },
      pageActions: [],
      title: 'Cadastro de Usuários',
      router: {
        path: USERS_PATH
      },
      httpBehavior: {
        authentication: true,
        compression: true,
        errorHandlingType: 'toast',
        loadingBehavior: 'none',
        needToRefreshToken: true
      },
      manageUserRolesUpdateClaim: AuthClaimDefinitions.MANAGE_USER_ROLES,
      manageUserClaimsUpdateClaim: AuthClaimDefinitions.OVERRIDE_USER_CLAIMS,
      avatarPlaceholderPath: 'assets/images/avatar_dark.png',
      isVisible: true,
      removalBehavior: null
    };

    this._menu = { label: 'Usuários', routerLink: USERS_PAGE_ROUTE, claims: [AuthClaimDefinitions.MANAGE_USERS] };
  }

  public setTitle(title: string): SmzUiUsersCrudBuilder<TData> {
    this._config.title = title;
    return this.that;
  }

  public setAvatarPlaceholder(path: string): SmzUiUsersCrudBuilder<TData> {
    this._config.avatarPlaceholderPath = path;
    return this.that;
  }

  public overrideMenu(partial: Partial<MenuCreation> = {}): SmzUiUsersCrudBuilder<TData> {
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public customTable(callback: () => SmzTableBuilder<TData>, ignoreDefaultMenu = false): SmzUiUsersCrudBuilder<TData> {
    this._config.table.customBuilder = callback;
    this._config.table.useDefaultMenu = !ignoreDefaultMenu;
    return this.that;
  }

  public addButton(button: SmzMenuItem): SmzUiUsersCrudBuilder<TData> {
    this._config.pageActions.push(button);
    return this.that;
  }

  public addButtons(): SmzGenericMenuBuilder<SmzUiUsersCrudBuilder<TData>> {
    return new SmzGenericMenuBuilder(this, this._config.pageActions);
  }

  public hide(): SmzUiUsersCrudBuilder<TData> {
    this._menu = null;
    this._config.isVisible = false;
    return this.that;
  }

  public allowUserDeactivation(): SmzUiUsersCrudBuilder<TData> {
    if (this._config.removalBehavior ===  'deletion') {
      throw Error(`You can't call allowUserDeactivation while using User Deletion Behavior.`);
    }

    this._config.removalBehavior = 'deactivation';
    return this.that;
  }

  public allowUserDeletion(): SmzUiUsersCrudBuilder<TData> {

    if (this._config.removalBehavior ===  'deactivation') {
      throw Error(`You can't call allowUserDeletion while using User Deactivation Behavior.`);
    }

    this._config.removalBehavior = 'deletion';
    return this.that;
  }

  public get authorization(): SmzUiAuthorizationBuilder<TData> {
    this._state.rbkUtils.authorization.users = this._config;

    if (this._menu != null) {
      switch (this._builder._menuLocation) {
        case 'navigation-bar':
          this._builder._menu.items.push(this._menu);
          break;

        case 'profile':
          this._state.rbkUtils.authorization.profileMenu.push(this._menu);
          break;
      }
    }

    if (this._state.rbkUtils.authorization.users.removalBehavior == null) {
      throw Error(`You didn't choose the User Removal Behavior. Please call 'allowUserDeactivation' or 'allowUserDeactivation'.`);
    }

    return this._builder;
  }
}

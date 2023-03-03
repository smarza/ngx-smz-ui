import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';
import { USERS_PAGE_ROUTE, USERS_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';
import { SmzTableBuilder } from '../smz-tables/state-builder';
import { SmzAuthorizationUserState } from '../../modules/smz-access/modules/users/models/smz-authorization-user-state';
import { SmzAuthorizationUserTableBuilder } from '../../modules/smz-access/modules/users/tables/user-table-state';

export class SmzUiUsersCrudBuilder extends SmzBuilderUtilities<SmzUiUsersCrudBuilder> {
  protected that = this;
  private _config: SmzAuthorizationUserState;
  private _menu: MenuCreation;

  constructor(private _builder: SmzUiAuthorizationBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      table: {
        defaultBuilder: SmzAuthorizationUserTableBuilder,
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
      isVisible: true
    };

    this._menu = { label: 'Usuários', routerLink: USERS_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_USERS };
  }

  public setTitle(title: string): SmzUiUsersCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public setAvatarPlaceholder(path: string): SmzUiUsersCrudBuilder {
    this._config.avatarPlaceholderPath = path;
    return this.that;
  }

  public overrideMenu(partial: Partial<MenuCreation> = {}): SmzUiUsersCrudBuilder {
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public customTable(callback: () => SmzTableBuilder, ignoreDefaultMenu = false): SmzUiUsersCrudBuilder {
    this._config.table.customBuilder = callback;
    this._config.table.useDefaultMenu = !ignoreDefaultMenu;
    return this.that;
  }

  public addPageAction(button: MenuCreation): SmzUiUsersCrudBuilder {
    this._config.pageActions.push(button);
    return this.that;
  }

  public hide(): SmzUiUsersCrudBuilder {
    this._menu = null;
    this._config.isVisible = false;
    return this.that;
  }

  public get authorization(): SmzUiAuthorizationBuilder {
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

    return this._builder;
  }
}

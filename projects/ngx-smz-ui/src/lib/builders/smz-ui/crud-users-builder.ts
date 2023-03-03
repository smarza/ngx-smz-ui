import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';
import { USERS_PAGE_ROUTE, USERS_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';

export class SmzUiUsersCrudBuilder extends SmzBuilderUtilities<SmzUiUsersCrudBuilder> {
  protected that = this;

  private _config: {
    router?: {
      path: string,
      claim?: string
    },
    title?: string;
    menu?: string;
    httpBehavior?: Partial<HttpBehaviorParameters>;
    manageUserRolesUpdateClaim?: string;
    manageUserClaimsUpdateClaim?: string;
    avatarPlaceholderPath?: string;
    isVisible?: boolean;
  }

  private _menu: MenuCreation;
  private _menuLocation: 'navigation-bar' | 'profile' = 'navigation-bar';

  constructor(private _builder: SmzUiAuthorizationBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      menu: 'Admin',
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
      manageUserRolesUpdateClaim: 'MANAGE_USERS_ROLES',
      manageUserClaimsUpdateClaim: 'MANAGE_USERS_CLAIMS',
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

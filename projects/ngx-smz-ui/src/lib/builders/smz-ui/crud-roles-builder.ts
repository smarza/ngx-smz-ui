import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { RoleBehavior } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';
import { ROLES_PAGE_ROUTE, ROLES_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';

export class SmzUiRolesCrudBuilder extends SmzBuilderUtilities<SmzUiRolesCrudBuilder> {
  protected that = this;
  private _config: {
    title?: string;
    router?: {
        path: string;
        claim?: string;
    };
    menu?: string;
    httpBehavior?: Partial<HttpBehaviorParameters>;
    behavior?: RoleBehavior;
    isVisible?: boolean;
  }

  private _menu: MenuCreation;

  constructor(private _builder: SmzUiAuthorizationBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      menu: 'Admin',
      router: {
          path: ROLES_PATH
      },
      title: 'Perfis',
      httpBehavior: {
          authentication: true,
          compression: true,
          errorHandlingType: 'toast',
          loadingBehavior: 'none',
          needToRefreshToken: true
      },
      behavior: 'multiple',
      isVisible: true
    };

    this._menu = { label: 'Perfis', routerLink: ROLES_PAGE_ROUTE, claims: [AuthClaimDefinitions.MANAGE_APPLICATION_WIDE_ROLES, AuthClaimDefinitions.MANAGE_TENANT_SPECIFIC_ROLES] };
  }

  public setTitle(title: string): SmzUiRolesCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public overrideMenu(partial: Partial<MenuCreation> = {}): SmzUiRolesCrudBuilder {
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public hide(): SmzUiRolesCrudBuilder {
    this._menu = null;
    this._config.isVisible = false;
    return this.that;
  }

  public get authorization(): SmzUiAuthorizationBuilder {
    this._state.rbkUtils.authorization.roles = this._config;

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

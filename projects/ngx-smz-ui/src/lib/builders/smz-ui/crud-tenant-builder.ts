import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';
import { TENANTS_PAGE_ROUTE, TENANTS_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';

export class SmzUiTenantCrudBuilder<TData> extends SmzBuilderUtilities<SmzUiTenantCrudBuilder<TData>> {
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
    isVisible?: boolean;
  }

  private _menu: MenuCreation;

  constructor(private _builder: SmzUiAuthorizationBuilder<TData>, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      menu: 'Admin',
      title: `Cadastro de ${this._state.locale.authorization.tenant.displayName}s`,
      router: {
        path: TENANTS_PATH
      },
      httpBehavior: {
        authentication: true,
        compression: true,
        errorHandlingType: 'toast',
        loadingBehavior: 'none',
        needToRefreshToken: true
      },
      isVisible: true
    };

    this._menu = { label: `${this._state.locale.authorization.tenant.displayName}s`, routerLink: TENANTS_PAGE_ROUTE, claims: [AuthClaimDefinitions.MANAGE_TENANTS] };
  }

  public setTitle(title: string): SmzUiTenantCrudBuilder<TData> {
    this._config.title = title;
    return this.that;
  }

  public overrideMenu(partial: Partial<MenuCreation> = {}): SmzUiTenantCrudBuilder<TData> {
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public hide(): SmzUiTenantCrudBuilder<TData> {
    this._menu = null;
    this._config.isVisible = false;
    return this.that;
  }

  public get authorization(): SmzUiAuthorizationBuilder<TData> {
    this._state.rbkUtils.authorization.tenants = this._config;

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

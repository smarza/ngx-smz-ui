import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { AuthClaimDefinitions } from '../../modules/smz-access/models/auth-claim-definitions';
import { CLAIMS_PAGE_ROUTE, CLAIMS_PATH } from '../../modules/smz-access/routes';
import { MenuCreation } from '../../modules/smz-layouts/core/models/menu-creation';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiAuthorizationBuilder } from './authorization-builder';

export class SmzUiClaimsCrudBuilder extends SmzBuilderUtilities<SmzUiClaimsCrudBuilder> {
  protected that = this;

  private _config: {
    title?: string;
    router?: {
        path: string;
        claim?: string;
    };
    menu?: string;
    httpBehavior?: Partial<HttpBehaviorParameters>;
    isVisible?: boolean;
  };

  private _menu: MenuCreation;

  constructor(private _builder: SmzUiAuthorizationBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      menu: 'Admin',
      router: {
          path: CLAIMS_PATH,
      },
      title: 'Permissões',
      httpBehavior: {
          authentication: true,
          compression: true,
          errorHandlingType: 'toast',
          loadingBehavior: 'none',
          needToRefreshToken: true
      },
      isVisible: true
    };

    this._menu = { label: 'Permissões', routerLink: CLAIMS_PAGE_ROUTE, claim: AuthClaimDefinitions.MANAGE_CLAIMS };
  }

  public setTitle(title: string): SmzUiClaimsCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public overrideMenu(partial: Partial<MenuCreation> = {}): SmzUiClaimsCrudBuilder {
    this._menu = { ...this._menu, ...partial };
    return this.that;
  }

  public hide(): SmzUiClaimsCrudBuilder {
    this._menu = null;
    this._config.isVisible = false;
    return this.that;
  }

  public get authorization(): SmzUiAuthorizationBuilder {
    this._state.rbkUtils.authorization.claims = this._config;

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

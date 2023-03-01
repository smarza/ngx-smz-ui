import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { NgxRbkUtilsConfig, RoleBehavior } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiCrudsBuilder } from './cruds-builder';

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
}

  constructor(private _builder: SmzUiCrudsBuilder, private _state: NgxRbkUtilsConfig) {
    super();

    this._config = {
      menu: 'Admin',
      router: {
          path: 'roles'
      },
      title: 'Perfis',
      httpBehavior: {
          authentication: true,
          compression: true,
          errorHandlingType: 'toast',
          loadingBehavior: 'none',
          needToRefreshToken: true
      },
      behavior: 'multiple'
  };
  }

  public setTitle(title: string): SmzUiRolesCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public get cruds(): SmzUiCrudsBuilder {
    this._state.cruds.roles = this._config;
    return this._builder;
  }
}

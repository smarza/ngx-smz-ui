import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { NgxSmzUiConfig } from '../../ngx-smz-ui.config';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiCrudsBuilder } from './cruds-builder';

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
  };

  constructor(private _builder: SmzUiCrudsBuilder, private _state: NgxSmzUiConfig) {
    super();

    this._config = {
      menu: 'Admin',
      router: {
          path: 'claims',
      },
      title: 'Permissões',
      httpBehavior: {
          authentication: true,
          compression: true,
          errorHandlingType: 'toast',
          loadingBehavior: 'none',
          needToRefreshToken: true
      },
    };
  }

  public setTitle(title: string): SmzUiClaimsCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public get cruds(): SmzUiCrudsBuilder {
    this._state.rbkUtils.cruds.claims = this._config;
    return this._builder;
  }
}
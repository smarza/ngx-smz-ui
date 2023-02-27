import { HttpBehaviorParameters } from '../../modules/rbk-utils/http/base-api.service';
import { NgxRbkUtilsConfig } from '../../modules/rbk-utils/ngx-rbk-utils.config';
import { UsersDbActions } from '../../state/database/users/users.actions';
import { getDbUsersInitialState, UsersDbState } from '../../state/database/users/users.state';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiCrudsBuilder } from './cruds-builder';

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
  }

  private _database = {
    state: UsersDbState,
    cacheTimeout: 30,
    loadAction: UsersDbActions.LoadAll,
    clearFunction: getDbUsersInitialState
  };
  constructor(private _builder: SmzUiCrudsBuilder, private _state: NgxRbkUtilsConfig) {
    super();

    this._config = {
      menu: 'Admin',
      title: 'Cadastro de Usuários',
      router: {
        path: 'users'
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
      avatarPlaceholderPath: 'assets/images/avatar_dark.png'
    };
  }

  public setTitle(title: string): SmzUiUsersCrudBuilder {
    this._config.title = title;
    return this.that;
  }

  public setAvatarPlaceholder(path: string): SmzUiUsersCrudBuilder {
    this._config.avatarPlaceholderPath = path;
    return this.that;
  }

  public get cruds(): SmzUiCrudsBuilder {
    this._state.cruds.users = this._config;
    Reflect.set(this._state.state.database, 'users', this._database);
    return this._builder;
  }
}

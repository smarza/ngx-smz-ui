import { ReplaceUserRoles as ReplaceUserRolesPayload } from '../../models/replace-user-roles';
import { UserDetails } from '../../models/user-details';

export namespace UsersActions {
  export class LoadAll {
    public static readonly type = '[Users API] Load All';
  }

  export class ReplaceUserRoles {
    public static readonly type = '[Access API] Update User Roles';
    constructor(public data: ReplaceUserRolesPayload) { }
  }

  export class LocalCreate<TUser extends UserDetails> {
    constructor(public data: TUser) { }
    public static readonly type = '[Users API] Local Create';
  }

  export class LocalUpdate<TUser extends UserDetails> {
    constructor(public data: TUser) { }
    public static readonly type = '[Users API] Local Update';
  }

  export class LocalDelete {
    constructor(public id: string) { }
    public static readonly type = '[Users API] Local Delete';
  }

  export class Clear {
    public static readonly type = '[Users API] Clear';
  }
}

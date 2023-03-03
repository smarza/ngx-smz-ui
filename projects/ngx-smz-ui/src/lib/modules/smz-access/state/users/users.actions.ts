import { ReplaceUserRoles as ReplaceUserRolesPayload } from '../../models/replace-user-roles';

export namespace UsersActions {
  export class LoadAll {
    public static readonly type = '[Users API] Load All';
  }

  export class ReplaceUserRoles {
    public static readonly type = '[Access API] Update User Roles';
    constructor(public data: ReplaceUserRolesPayload) { }
  }

  export class Clear {
    public static readonly type = '[Users API] Clear';
  }
}

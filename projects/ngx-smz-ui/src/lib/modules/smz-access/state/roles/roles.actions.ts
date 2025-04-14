import { CreateRole } from '../../models/create-role';
import { RenameRole } from '../../models/rename-role';
import { UpdateRoleClaims } from '../../models/update-role-claims';

export namespace RolesActions {
  export class LoadAll {
    public static readonly type = '[Roles API] LoadAll';
  }

  export class Create {
    public static readonly type = '[Roles API] Create';

    constructor(public data: CreateRole) {}
  }

  export class Update {
    public static readonly type = '[Roles API] Update';

    constructor(public data: RenameRole) {}
  }

  export class Delete {
    public static readonly type = '[Roles API] Delete';

    constructor(public id: string) {}
  }

  export class UpdateClaims {
    public static readonly type = '[Roles API] Update Claims';

    constructor(public data: UpdateRoleClaims) {}
  }

  export class Clear {
    public static readonly type = '[Roles API] Clear';
  }
}

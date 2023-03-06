import { UpdateUserWithSingleRole as UpdateUserWithSingleRoleDto } from '@models/update-user-with-single-role';
import { CreateUserWithSingleRole as CreateUserWithSingleRoleDto } from '@models/create-user-with-single-role';
import { UpdateUserWithMultipleRoles as UpdateUserWithMultipleRolesDto } from '@models/update-user-with-multiple-roles';
import { CreateUserWithMultipleRoles as CreateUserWithMultipleRolesDto } from '@models/create-user-with-multiple-roles';
import { DeleteUser } from '@models/delete-user';

export namespace UsersFtActions {

  export class LoadCASingle {
    public static readonly type = '[Users Ft] Load CA Single User Info';

    constructor(public username: string) { }
  }

  export class Remove {
    public static readonly type = '[Users Ft] Delete User';

    constructor(public data: DeleteUser) { }
  }

  export class UpdateUserWithSingleRole {
    public static readonly type = '[Users Ft] Update User With Single Role';

    constructor(public data: UpdateUserWithSingleRoleDto) { }
  }

  export class CreateUserWithSingleRole {
    public static readonly type = '[Users Ft] Create User With Single Role';

    constructor(public data: CreateUserWithSingleRoleDto) { }
  }

  export class UpdateWithMultipleRoles {
    public static readonly type = '[Users Ft] Update User With Multiple Roles';

    constructor(public data: UpdateUserWithMultipleRolesDto) { }
  }

  export class CreateWithMultipleRoles {
    public static readonly type = '[Users Ft] Create User With Multiple Roles';

    constructor(public data: CreateUserWithMultipleRolesDto) { }
  }

}

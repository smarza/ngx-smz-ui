import { ReplaceUserRoles as ReplaceUserRolesPayload } from '../../models/replace-user-roles';
import { UserDetails } from '../../models/user-details';
import { AddClaimsOverride as AddClaimOverridePayload } from '../../models/add-claims-override';
import { RemoveClaimsOverride as RemoveClaimOverridePayload } from '../../models/remove-claims-override';
import { RedefinePassword as RedefinePasswordPayload } from '../../models/redefine-password';
import { ResetPassword as ResetPasswordPayload } from '../../models/reset-password';

export namespace UsersActions {
  export class LoadAll {
    public static readonly type = '[Users API] Load All';
  }

  export class ReplaceUserRoles {
    public static readonly type = '[Users API] Update User Roles';
    constructor(public data: ReplaceUserRolesPayload) { }
  }

  export class AddClaimsOverride {
    public static readonly type = '[Users API] Add Claims Override';
    constructor(public data: AddClaimOverridePayload) { }
  }

  export class RemoveClaimsOverride {
    public static readonly type = '[Users API] Remove Claims Override';
    constructor(public data: RemoveClaimOverridePayload) { }
  }

  export class LocalCreate<TUser extends UserDetails> {
    constructor(public data: TUser) { }
    public static readonly type = '[Users API] Local Create';
  }

  export class LocalUpdate<TUser extends UserDetails> {
    constructor(public data: TUser) { }
    public static readonly type = '[Users API] Local Update';
  }

  export class ResetPassword {
    public static readonly type = '[Users API] Reset Password';
    constructor(public data: ResetPasswordPayload) { }
  }

  export class RedefinePassword {
    public static readonly type = '[Users API] Redefine Password';
    constructor(public data: RedefinePasswordPayload) { }
  }

  export class LocalDelete {
    constructor(public id: string) { }
    public static readonly type = '[Users API] Local Delete';
  }

  export class Clear {
    public static readonly type = '[Users API] Clear';
  }
}

import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';
import { AddClaimOverride as AddClaimOverridePayload } from '../../models/add-claim-override';
import { ClaimOverride } from '../../models/claim-override';
import { RemoveClaimOverride as RemoveClaimOverridePayload } from '../../models/remove-claim-override';
import { ReplaceUserRoles as ReplaceUserRolesPayload } from '../../models/replace-user-roles';
import { UserDetails } from '../../models/user-details';

export namespace AccessActions {

  export class ReplaceUserRoles {
    public static readonly type = '[Access API] Update User Roles';
    constructor(public data: ReplaceUserRolesPayload) { }
  }

  export class AddClaimOverride {
    public static readonly type = '[Access API] Add Claim Override';
    constructor(public data: AddClaimOverridePayload) { }
  }

  export class RemoveClaimOverride {
    public static readonly type = '[Access API] Remove Claim Override';
    constructor(public data: RemoveClaimOverridePayload) { }
  }

  export class UpdateUserRolesSuccess {
    public static readonly type = '[Access API] Update User Roles Success';
    constructor(public username, public data: UserDetails) { }
  }

  export class UpdateUserClaimsSuccess {
    public static readonly type = '[Access API] Update User Claims Success';
    constructor(public username, public data: ClaimOverride[]) { }
  }

}

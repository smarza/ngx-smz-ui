import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';
import { AddClaimToUser as AddClaimToUserPayload } from '../../models/add-claim-to-user';
import { ClaimOverride } from '../../models/claim-override';
import { RemoveClaimFromUser as RemoveClaimFromUserPayload } from '../../models/remove-claim-from-user';
import { UpdateUserRoles as UpdateUserRolesPayload } from '../../models/update-user-roles';

export namespace AccessActions {

  export class UpdateUserRoles {
    public static readonly type = '[Access API] Update User Roles';
    constructor(public data: UpdateUserRolesPayload) { }
  }

  export class AddClaimToUser {
    public static readonly type = '[Access API] Add Claim To User';
    constructor(public data: AddClaimToUserPayload) { }
  }

  export class RemoveClaimFromUser {
    public static readonly type = '[Access API] Remove Claim From User';
    constructor(public data: RemoveClaimFromUserPayload) { }
  }

  export class UpdateUserRolesSuccess {
    public static readonly type = '[Access API] Update User Roles Success';
    constructor(public username, public data: SimpleNamedEntity[]) { }
  }

  export class UpdateUserClaimsSuccess {
    public static readonly type = '[Access API] Update User Claims Success';
    constructor(public username, public data: ClaimOverride[]) { }
  }

}

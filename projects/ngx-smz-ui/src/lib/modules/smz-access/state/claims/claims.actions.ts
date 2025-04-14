import { CreateClaim } from '../../models/create-claim';
import { ProtectClaim } from '../../models/protect-claim';
import { UnprotectClaim } from '../../models/unprotect-claim';
import { UpdateClaim } from '../../models/update-claim';

export namespace ClaimsActions {
  export class LoadAll {
    public static readonly type = '[Claims API] LoadAll';
  }

  export class Create {
    public static readonly type = '[Claims API] Create';

    constructor(public data: CreateClaim) {}
  }

  export class Update {
    public static readonly type = '[Claims API] Update';

    constructor(public data: UpdateClaim) {}
  }

  export class Protect {
    public static readonly type = '[Claims API] Protect';

    constructor(public data: ProtectClaim) {}
  }

  export class Unprotect {
    public static readonly type = '[Claims API] Unprotect';

    constructor(public data: UnprotectClaim) {}
  }

  export class Delete {
    public static readonly type = '[Claims API] Delete';

    constructor(public id: string) {}
  }

  export class Clear {
    public static readonly type = '[Claims API] Clear';
  }
}

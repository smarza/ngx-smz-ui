import { CreateClaim } from '../../models/create-claim';
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

  export class Delete {
    public static readonly type = '[Claims API] Delete';

    constructor(public id: string) {}
  }

  export class Clear {
    public static readonly type = '[Claims API] Clear';
  }
}

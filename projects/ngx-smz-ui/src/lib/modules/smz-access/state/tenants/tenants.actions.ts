import { CreateTenant } from '../../models/create-tenant';
import { UpdateTenant } from '../../models/update-tenant';

export namespace TenantsActions {
  export class LoadAll {
    public static readonly type = '[Tenants API] LoadAll';
  }

  export class Create {
    public static readonly type = '[Tenants API] Create';

    constructor(public data: CreateTenant) {}
  }

  export class Update {
    public static readonly type = '[Tenants API] Update';

    constructor(public data: UpdateTenant) {}
  }

  export class Delete {
    public static readonly type = '[Tenants API] Delete';

    constructor(public alias: string) {}
  }

  export class Clear {
    public static readonly type = '[Tenants API] Clear';
  }
}

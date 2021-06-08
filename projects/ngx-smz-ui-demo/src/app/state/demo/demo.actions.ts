import { DemoCreationData, DemoUpdateData } from '../../models/demo';

export namespace DemoFeatureActions {

  export class LoadAll {
    public static readonly type = '[DEMO] Load All';
    constructor() {}
  }

  export class Update {
    public static readonly type = '[DEMO] Update';
    constructor(public data: DemoUpdateData) {}
  }

  export class Create {
    public static readonly type = '[DEMO] Create';
    constructor(public data: DemoCreationData) {}
  }

  export class Remove {
    public static readonly type = '[DEMO] Remove';
    constructor(public id: string) {}
  }

}
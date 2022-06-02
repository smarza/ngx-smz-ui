import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';

export namespace DemoFeatureActions {

  export class LoadAll {
    public static readonly type = '[DEMO] Load All';
    constructor() {}
  }

  export class LoadTree {
    public static readonly type = '[DEMO] Load Tree';
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

  export class CreateSuccess {
    public static readonly type = '[DEMO] Create Success';
    constructor(public data: DemoItem) {}
  }

  export class Remove {
    public static readonly type = '[DEMO] Remove';
    constructor(public id: string) {}
  }

  export class BlockUiDemo {
    public static readonly type = '[DEMO] Block Ui Demo';
    constructor(public data: Number) {}
  }
  export class BlockUiDemoSuccess {
    public static readonly type = '[DEMO] Block Ui Demo Success';
  }

  export class SetRoute {
    public static readonly type = '[DEMO] Set Route';
    constructor(public key: string, public navigate: boolean) {}
  }

}
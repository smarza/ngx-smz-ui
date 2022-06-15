import { TreeNode } from 'primeng/api';
import { DemoCreationData, DemoItem, DemoUpdateData } from '../../models/demo';

export namespace TreeDemoFeatureActions {

  export class LoadAll {
    public static readonly type = '[TREE DEMO] Load All';
  }

  export class Update {
    public static readonly type = '[TREE DEMO] Update';
  }

  export class Create {
    public static readonly type = '[TREE DEMO] Create';
  }

  export class CreateSuccess {
    public static readonly type = '[TREE DEMO] Create Success';
    constructor(public data: TreeNode) {}
  }

  export class Remove {
    public static readonly type = '[TREE DEMO] Remove';
    constructor(public id: string) {}
  }

  export class BlockUiDemo {
    public static readonly type = '[TREE DEMO] Block Ui Demo';
    constructor(public data: any) {}
  }

  export class BlockUiDemoSuccess {
    public static readonly type = '[TREE DEMO] Block Ui Demo Success';
  }

}
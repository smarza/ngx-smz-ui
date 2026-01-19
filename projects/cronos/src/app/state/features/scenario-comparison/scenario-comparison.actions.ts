
export namespace ScenarioComparisonActions {
  export class Load {
    public static readonly type = '[Scenario Comparison] Load';

    constructor(public ids: string[]) {}
  }

  export class Clear {
    public static readonly type = '[Scenario Comparison] Clear';
  }
}

import { UpdateScenarioWithCorrosionGoalStrategy as UpdateScenarioWithCorrosionGoalStrategyDto } from '@models/update-scenario-with-corrosion-goal-strategy';
import { UpdateScenarioWithAvailableManHourStrategy as UpdateScenarioWithAvailableManHourStrategyDto } from '@models/update-scenario-with-available-man-hour-strategy';
import { UpdateScenarioWithCriticityStrategy as UpdateScenarioWithCriticityStrategyDto } from '@models/update-scenario-with-criticity-strategy';
import { UpdateScenarioWithPrioritizationStrategy as UpdateScenarioWithPrioritizationStrategyDto } from '@models/update-scenario-with-prioritization-strategy';
import { UpdateScenarioWithRtiStrategy as UpdateScenarioWithRtiStrategyDto } from '@models/update-scenario-with-rti-strategy';
import { UpdateScenarioPostOptimization as UpdateScenarioPostOptimizationDto } from '@models/update-scenario-post-optimization';

export namespace ScenariosFtActions {
  export class LoadSingleScenario {
    public static readonly type = '[Scenarios Ft] Load Single Scenario';

    constructor(public id: string) {}
  }

  export class UpdateScenarioWithCorrosionGoalStrategy {
    public static readonly type = '[Scenarios Ft] Update Scenario with Corrosion Goal Strategy';

    constructor(public data: UpdateScenarioWithCorrosionGoalStrategyDto) {}
  }

  export class UpdateScenarioWithAvailableManHourStrategy {
    public static readonly type = '[Scenarios Ft] Update Scenario with Available Man Hour Strategy';

    constructor(public data: UpdateScenarioWithAvailableManHourStrategyDto) {}
  }

  export class UpdateScenarioWithCriticityStrategy {
    public static readonly type = '[Scenarios Ft] Update Scenario with Criticity Strategy';

    constructor(public data: UpdateScenarioWithCriticityStrategyDto) {}
  }

  export class UpdateScenarioWithPrioritizationStrategy {
    public static readonly type = '[Scenarios Ft] Update Scenario with Prioritization Strategy';

    constructor(public data: UpdateScenarioWithPrioritizationStrategyDto) {}
  }

  export class UpdateScenarioWithRtiStrategy {
    public static readonly type = '[Scenarios Ft] Update Scenario with Rti Strategy';

    constructor(public data: UpdateScenarioWithRtiStrategyDto) {}
  }

  export class UpdateScenarioPostOptimization {
    public static readonly type = '[Scenarios Ft] Update Scenario Post Optimization';

    constructor(public data: UpdateScenarioPostOptimizationDto) {}
  }

  export class Clear {
    public static readonly type = '[Scenarios Ft] Clear';
  }
}

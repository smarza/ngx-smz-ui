import { UpdateInspectionDataFromSpreadsheet as UpdateInspectionDataFromSpreadsheetDto } from '@models/update-inspection-data-from-spreadsheet';
import { UpdateRtiData as UpdateRtiDataDto} from '@models/update-rti-data';
import { CreateScenarioWithCorrosionGoalStrategy as CreateScenarioWithCorrosionGoalStrategyDto } from '@models/create-scenario-with-corrosion-goal-strategy';
import { CreateScenarioWithAvailableManHourStrategy as CreateScenarioWithAvailableManHourStrategyDto } from '@models/create-scenario-with-available-man-hour-strategy';
import { CreateScenarioWithCriticityStrategy as CreateScenarioWithCriticityStrategyDto } from '@models/create-scenario-with-criticity-strategy';
import { CreateScenarioWithPrioritizationStrategy as CreateScenarioWithPrioritizationStrategyDto } from '@models/create-scenario-with-prioritization-strategy';
import { CreateScenarioWithRtiStrategy as CreateScenarioWithRtiStrategyDto } from '@models/create-scenario-with-rti-strategy';
import { CalculateScenarioResults as CalculateScenarioResultsDto } from '@models/calculate-scenario-results';
import { SelectPaintingPlan } from '@models/select-painting-plan';

export namespace AnnualPlanningsFtActions {
  export class LoadSingleAnnualPlanning {
    public static readonly type = '[Annual Plannings Ft] Load Single Annual Planning';

    constructor(public id: string) {}
  }

  export class LoadAnnualPlanningScenarios {
    public static readonly type = '[Annual Plannings Ft] Load Annual Planning Scenarios';

    constructor(public planningId: string) {}
  }

  export class LoadAnnualPlanningScenariosSilent {
    public static readonly type = '[Annual Plannings Ft] Load Annual Planning Scenarios Silent';

    constructor(public planningId: string) {}
  }

  export class SelectPlan {
    public static readonly type = '[Annual Plannings Ft] Select Plan';

    constructor(public selectPlan: SelectPaintingPlan) {}
  }

  export class CreateScenarioWithCorrosionGoalStrategy {
    public static readonly type = '[AnnualPlannings Ft] Create Scenario with Corrosion Goal Strategy';

    constructor(public data: CreateScenarioWithCorrosionGoalStrategyDto) {}
  }

  export class CreateScenarioWithAvailableManHourStrategy {
    public static readonly type = '[AnnualPlannings Ft] Create Scenario with Available Man Hour Strategy';

    constructor(public data: CreateScenarioWithAvailableManHourStrategyDto) {}
  }

  export class CreateScenarioWithCriticityStrategy {
    public static readonly type = '[AnnualPlannings Ft] Create Scenario with Criticity Strategy';

    constructor(public data: CreateScenarioWithCriticityStrategyDto) {}
  }

  export class CreateScenarioWithPrioritizationStrategy {
    public static readonly type = '[AnnualPlannings Ft] Create Scenario with Prioritization Strategy';

    constructor(public data: CreateScenarioWithPrioritizationStrategyDto) {}
  }

  export class CreateScenarioWithRtiStrategy {
    public static readonly type = '[AnnualPlannings Ft] Create Scenario with Rti Strategy';

    constructor(public data: CreateScenarioWithRtiStrategyDto) {}
  }

  export class DeleteScenario {
    public static readonly type = '[AnnualPlannings Ft] Delete Scenario';

    constructor(public id: string) {}
  }

  export class UpdateInspectionDataFromSpreadsheet {
    public static readonly type = '[AnnualPlannings Ft] Update Inspection Data From Spreadsheet';

    constructor(public data: UpdateInspectionDataFromSpreadsheetDto) {}
  }

  export class UpdateRtiData {
    public static readonly type = '[AnnualPlannings Ft] Update Rti Data';

    constructor(public data: UpdateRtiDataDto) {}
  }

  export class CalculateScenarioResults {
    public static readonly type = '[AnnualPlannings Ft] Calculate Scenario Results';

    constructor(public data: CalculateScenarioResultsDto) {}
  }

  export class LoadHistory {
    public static readonly type = '[AnnualPlannings Ft] Load History';
    constructor(public readonly annualPlanningId: string) {}
  }

  export class Clear {
    public static readonly type = '[Annual Plannings Ft] Clear';
  }
}

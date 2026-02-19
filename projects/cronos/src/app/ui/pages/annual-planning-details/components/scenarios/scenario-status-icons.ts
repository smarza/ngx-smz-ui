import { ScenarioStatus } from '@models/scenario-status';

export const SCENARIO_STATUS_ICONS = {
  [ScenarioStatus.DRAFT]: 'fa-solid fa-pencil',
  [ScenarioStatus.WAITING_SCENARIO_CALCULATION]: 'fa-solid fa-clock',
  [ScenarioStatus.CALCULATING_SCENARIO_RESULTS]: 'fa-solid fa-spinner',
  [ScenarioStatus.SCENARIO_RESULTS_CALCULATION_SUCCEEDED]: 'fa-solid fa-check',
  [ScenarioStatus.SCENARIO_RESULTS_CALCULATION_FAILED]: 'fa-solid fa-xmark'
};

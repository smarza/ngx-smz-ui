import { ScenarioStatus } from '@models/scenario-status';
import { AnnualPlanningStatus } from '@models/annual-planning-status';
import { ScenarioProductivityData } from '@models/scenario-productivity-data';
import { ScenarioResultsData } from '@models/scenario-results-data';
import { Team } from '@models/team';

export interface ScenarioDetails {
  name: string;
  isSelectedPlan: boolean;
  creationDate: Date;
  status: ScenarioStatus;
  planningId: string;
  planningStatus: AnnualPlanningStatus;
  strategyName: string;
  strategyDisplayName: string;
  corrosionGoal: number;
  considerProximity: boolean;
  overrideProductivity: boolean;
  defaultCorrosion: boolean;
  ignoreCorrosionGoal?: boolean;
  productivity: ScenarioProductivityData;
  results: ScenarioResultsData;
  teams: Team[];
  id: string;
}

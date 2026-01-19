import { ScenarioPaintingPlanSystemData } from '@models/scenario-painting-plan-system-data';
import { ScenarioResultsData } from '@models/scenario-results-data';

export interface ScenarioPaintingPlan {
  name: string;
  strategyName: string;
  strategyDisplayName: string;
  considerProximity: boolean;
  systemData: ScenarioPaintingPlanSystemData[];
  results: ScenarioResultsData;
  id: string;
}

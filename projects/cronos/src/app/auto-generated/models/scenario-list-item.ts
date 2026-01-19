import { ScenarioStatus } from '@models/scenario-status';

export interface ScenarioListItem {
  name: string;
  isSelectedPlan: boolean;
  creationDate: Date;
  status: ScenarioStatus;
  planningId: string;
  strategyName: string;
  strategyDisplayName: string;
  id: string;
}

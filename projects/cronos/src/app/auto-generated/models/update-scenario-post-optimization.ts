import { SystemPostOptimization } from '@models/system-post-optimization';

export interface UpdateScenarioPostOptimization {
  scenarioId: string;
  systemPostOptimizationData: SystemPostOptimization[];
}

import { VariableTeamData } from '@models/variable-team-data';

export interface UpdateScenarioWithCorrosionGoalStrategy {
  scenarioId: string;
  name: string;
  considerProximity: boolean;
  overrideProductivity: boolean;
  defaultCorrosion: boolean;
  corrosionGoal: number;
  floor: number;
  equipment: number;
  bulkhead: number;
  structure: number;
  ceiling: number;
  stairs: number;
  supports: number;
  guardrail: number;
  pippingValvesFlanges: number;
  teamData: VariableTeamData[];
}

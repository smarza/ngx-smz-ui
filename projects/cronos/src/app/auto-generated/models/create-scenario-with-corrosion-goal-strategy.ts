import { VariableTeamData } from '@models/variable-team-data';

export interface CreateScenarioWithCorrosionGoalStrategy {
  annualPlanningId: string;
  name: string;
  considerProximity: boolean;
  corrosionGoal: number;
  overrideProductivity: boolean;
  defaultCorrosion: boolean;
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

import { FixedTeamData } from '@models/fixed-team-data';

export interface CreateScenarioWithCriticityStrategy {
  annualPlanningId: string;
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
  teamData: FixedTeamData[];
}

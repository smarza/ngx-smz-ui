import { FixedTeamData } from '@models/fixed-team-data';

export interface UpdateScenarioWithRtiStrategy {
  scenarioId: string;
  name: string;
  considerProximity: boolean;
  overrideProductivity: boolean;
  defaultCorrosion: boolean;
  ignoreCorrosionGoal: boolean;
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

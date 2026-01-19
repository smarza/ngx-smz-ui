import { TeamType } from '@models/team-type';

export interface Team {
  id: string;
  name: string;
  teamType: TeamType;
  minPainters?: number;
  maxPainters: number;
  minDays?: number;
  maxDays: number;
  minAvailability?: number;
  maxAvailability: number;
  minimumManHours?: number;
  maximumManHours: number;
  hidroblastLocations: string[];
  hidroblastLocationsQuantity?: number;
}

import { SmzForm, SmzTreeState } from '@ngx-smz/core';

export interface StrategyFormData<TGeneral, TTeam> {
  strategyName: string;
  generalForm: SmzForm<TGeneral>;
  teamForms: TeamForm<TTeam>[];
  hidroblastLocations: HidroblastLocation[];
  defaultTeamForm: SmzForm<TTeam>;
  defaultHidroblastLocations: string[];
  hidroblastLocationsTree: SmzTreeState;
}

export interface HidroblastLocation {
  name: string;
  sectors: { id: string, name: string }[];
}

export interface TeamForm<TTeam> {
  teamData: SmzForm<TTeam>;
  hidroblastLocations: string[];
}
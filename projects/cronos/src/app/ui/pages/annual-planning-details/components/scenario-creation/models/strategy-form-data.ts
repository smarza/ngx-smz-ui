import { SmzForm, SmzTreeState } from '@ngx-smz/core';

export interface StrategyFormData<TGeneral, TTeam> {
  strategyName: string;
  generalForm: SmzForm<TGeneral>;
  teamForm: SmzForm<TTeam>;
  hidroblastLocations: HidroblastLocation[];
  defaultHidroblastLocations: string[];
  hidroblastLocationsTree: SmzTreeState;
}

export interface HidroblastLocation {
  name: string;
  sectors: { id: string, name: string }[];
}


import { SimpleEntity } from '@ngx-smz/core';

export enum TeamType {
  FIXED_TEAM = 0,
  VARIABLE_TEAM = 10,
}

export const TeamTypeDescription: { [key in TeamType]: string } = {
  [TeamType.FIXED_TEAM]: 'FixedTeam',
  [TeamType.VARIABLE_TEAM]: 'VariableTeam',
};

export const TeamTypeValues: SimpleEntity<number>[] = [
  { id: 0, name: 'FixedTeam' },
  { id: 10, name: 'VariableTeam' },
];

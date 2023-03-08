import { SimpleEntity } from '../../../common/models/simple-named-entity';

export enum RoleSource {
  GLOBAL = 1,
  LOCAL = 2,
}

export const RoleSourceDescription: { [key in RoleSource]: string } = {
  [RoleSource.GLOBAL]: 'Global',
  [RoleSource.LOCAL]: 'Local',
};

export const RoleSourceValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Global' },
  { id: 1, name: 'Local' },
];

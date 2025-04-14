import { SimpleEntity } from '../../../common/models/simple-named-entity';

export enum RoleMode {
  NORMAL = 1,
  OVERWRITTEN = 2,
}

export const RoleModeDescription: { [key in RoleMode]: string } = {
  [RoleMode.NORMAL]: 'Normal',
  [RoleMode.OVERWRITTEN]: 'Sobrescrita',
};

export const RoleModeValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Normal' },
  { id: 1, name: 'Sobrescrita' },
];

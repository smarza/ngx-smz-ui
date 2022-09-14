import { SimpleEntity } from '../../../common/models/simple-named-entity';

export enum ClaimAccessType {
  BLOCK = 0,
  ALLOW = 1,
}

export const ClaimAccessTypeDescription: { [key in ClaimAccessType]: string } = {
  [ClaimAccessType.BLOCK]: 'Block',
  [ClaimAccessType.ALLOW]: 'Allow',
};

export const ClaimAccessTypeValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Block' },
  { id: 1, name: 'Allow' },
];

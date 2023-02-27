import { SimpleEntity } from '../../../common/models/simple-named-entity';


export enum ClaimAccessType {
  BLOCK = 0,
  ALLOW = 1,
}

export const ClaimAccessTypeDescription: { [key in ClaimAccessType]: string } = {
  [ClaimAccessType.BLOCK]: 'Bloquear',
  [ClaimAccessType.ALLOW]: 'Permitir',
};

export const ClaimAccessTypeValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Bloquear' },
  { id: 1, name: 'Permitir' },
];

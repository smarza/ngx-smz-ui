import { SimpleEntity } from '@ngx-smz/core';

export enum DefaultCorrosionStandard {
  LMG = 0,
  SGP = 1,
}

export const DefaultCorrosionStandardDescription: { [key in DefaultCorrosionStandard]: string } = {
  [DefaultCorrosionStandard.LMG]: 'LMG',
  [DefaultCorrosionStandard.SGP]: 'SGP',
};

export const DefaultCorrosionStandardValues: SimpleEntity<number>[] = [
  { id: 0, name: 'LMG' },
  { id: 1, name: 'SGP' },
];

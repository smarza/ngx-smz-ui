import { SimpleEntity } from '@ngx-smz/core';

export enum EnvironSituation {
  CURRENT_SITUATION = 0,
  POST_PAINTING_SITUATION = 1,
}

export const EnvironSituationValues: SimpleEntity<number>[] = [
  { id: EnvironSituation.CURRENT_SITUATION, name: 'Situação Atual' },
  { id: EnvironSituation.POST_PAINTING_SITUATION, name: 'Situação Pós-Pintura' },
];
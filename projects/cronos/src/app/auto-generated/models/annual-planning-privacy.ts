import { SimpleEntity } from '@ngx-smz/core';

export enum AnnualPlanningPrivacy {
  PRIVATE = 0,
  PUBLIC = 1,
}

export const AnnualPlanningPrivacyDescription: { [key in AnnualPlanningPrivacy]: string } = {
  [AnnualPlanningPrivacy.PRIVATE]: 'Privado',
  [AnnualPlanningPrivacy.PUBLIC]: 'Público',
};

export const AnnualPlanningPrivacyValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Privado' },
  { id: 1, name: 'Público' },
];

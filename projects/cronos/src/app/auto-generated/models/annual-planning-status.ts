import { SimpleEntity } from '@ngx-smz/core';

export enum AnnualPlanningStatus {
  DRAFT = 0,
  WAITING_PRE_EXPLORATORY_CALCULATION = 10,
  CALCULATING_PRE_EXPLORATORY_VIEW = 20,
  PRE_EXPLORATORY_VIEW_CALCULATION_SUCCEEDED = 30,
  PRE_EXPLORATORY_VIEW_CALCULATION_FAILED = 40,
  APPROVED = 100,
}

export const AnnualPlanningStatusDescription: { [key in AnnualPlanningStatus]: string } = {
  [AnnualPlanningStatus.DRAFT]: 'Rascunho',
  [AnnualPlanningStatus.WAITING_PRE_EXPLORATORY_CALCULATION]: 'Aguardando Cálculo Pré-Exploratório',
  [AnnualPlanningStatus.CALCULATING_PRE_EXPLORATORY_VIEW]: 'Calculando Visão Pré-Exploratória',
  [AnnualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_SUCCEEDED]: 'Visão Pré-Exploratória Calculada',
  [AnnualPlanningStatus.PRE_EXPLORATORY_VIEW_CALCULATION_FAILED]: 'Cálculo da Visão Pré-Exploratória Falhou',
  [AnnualPlanningStatus.APPROVED]: 'Aprovado',
};

export const AnnualPlanningStatusValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Rascunho' },
  { id: 10, name: 'Aguardando Cálculo Pré-Exploratório' },
  { id: 20, name: 'Calculando Visão Pré-Exploratória' },
  { id: 30, name: 'Visão Pré-Exploratória Calculada' },
  { id: 40, name: 'Cálculo da Visão Pré-Exploratória Falhou' },
  { id: 100, name: 'Aprovado' },
];

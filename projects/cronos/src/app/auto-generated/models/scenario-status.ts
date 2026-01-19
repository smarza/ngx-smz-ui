import { SimpleEntity } from '@ngx-smz/core';

export enum ScenarioStatus {
  DRAFT = 0,
  WAITING_SCENARIO_CALCULATION = 10,
  WAITING_SCENARIO_POST_OPTIMIZATION_CALCULATION = 20,
  CALCULATING_SCENARIO_RESULTS = 30,
  CALCULATING_SCENARIO_POST_OPTIMIZATION_RESULTS = 40,
  SCENARIO_RESULTS_CALCULATION_SUCCEEDED = 50,
  SCENARIO_RESULTS_CALCULATION_FAILED = 60,
}

export const ScenarioStatusDescription: { [key in ScenarioStatus]: string } = {
  [ScenarioStatus.DRAFT]: 'Rascunho',
  [ScenarioStatus.WAITING_SCENARIO_CALCULATION]: 'Aguardando Cálculo',
  [ScenarioStatus.WAITING_SCENARIO_POST_OPTIMIZATION_CALCULATION]: 'Aguardando Cálculo Pós-Otimização',
  [ScenarioStatus.CALCULATING_SCENARIO_RESULTS]: 'Calculando Resultados',
  [ScenarioStatus.CALCULATING_SCENARIO_POST_OPTIMIZATION_RESULTS]: 'Calculando Resultados Pós-Otimização',
  [ScenarioStatus.SCENARIO_RESULTS_CALCULATION_SUCCEEDED]: 'Cálculo Concluído',
  [ScenarioStatus.SCENARIO_RESULTS_CALCULATION_FAILED]: 'Cálculo dos Resultados Falhou',
};

export const ScenarioStatusValues: SimpleEntity<number>[] = [
  { id: 0, name: 'Rascunho' },
  { id: 10, name: 'Aguardando Cálculo' },
  { id: 20, name: 'Aguardando Cálculo Pós-Otimização' },
  { id: 30, name: 'Calculando Resultados' },
  { id: 40, name: 'Calculando Resultados Pós-Otimização' },
  { id: 50, name: 'Cálculo Concluído' },
  { id: 60, name: 'Cálculo dos Resultados Falhou' },
];

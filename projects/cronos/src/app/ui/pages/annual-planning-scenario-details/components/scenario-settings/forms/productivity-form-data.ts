import { ScenarioDetails } from '@models/scenario-details';
import { ScenarioProductivityData } from '@models/scenario-productivity-data';
import { SmzForm, SmzFormBuilder } from '@ngx-smz/core';

export function buildProductivityFormData<TFormResponse extends { overrideProductivity: boolean }>(
  generalForm: SmzFormBuilder<TFormResponse>,
  defaultProductivityData: ScenarioProductivityData,
  scenario: ScenarioDetails,
  isEditing: boolean): SmzForm<TFormResponse> {

  return generalForm.group('Dados de Produtividade')
    .radioGroup('overrideProductivity', 'Sobrepor produtividade importada', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.overrideProductivity)
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .overrideResponseFormat('IdOnly')
      .disable(!isEditing)
      .validators().required().input
      .group
    .number('floor', 'Piso', scenario.productivity? scenario.productivity.floor : defaultProductivityData.floor)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('equipment', 'Equipamento', scenario.productivity? scenario.productivity.equipment : defaultProductivityData.equipment)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('bulkhead', 'Antepara', scenario.productivity? scenario.productivity.bulkhead : defaultProductivityData.bulkhead)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('structure', 'Estrutura', scenario.productivity? scenario.productivity.structure : defaultProductivityData.structure)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('ceiling', 'Teto', scenario.productivity? scenario.productivity.ceiling : defaultProductivityData.ceiling)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('stairs', 'Escada', scenario.productivity? scenario.productivity.stairs : defaultProductivityData.stairs)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('supports', 'Suporte', scenario.productivity? scenario.productivity.supports : defaultProductivityData.supports)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('guardrail', 'Guarda-Corpo', scenario.productivity? scenario.productivity.guardrail : defaultProductivityData.guardrail)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('pippingValvesFlanges', 'TVF', scenario.productivity? scenario.productivity.pippingValvesFlanges : defaultProductivityData.pippingValvesFlanges)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .disable(!isEditing)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .form
    .build();
}
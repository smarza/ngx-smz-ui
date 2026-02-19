import { ScenarioProductivityData } from '@models/scenario-productivity-data';
import { SmzForm, SmzFormBuilder } from '@ngx-smz/core';

interface ProductivityData {
  overrideProductivity: boolean;
  floor: number;
  equipment: number;
  bulkhead: number;
  structure: number;
  ceiling: number;
  stairs: number;
  supports: number;
  guardrail: number;
  pippingValvesFlanges: number;
}

export function buildProductivityFormData<TFormResponse extends ProductivityData>(generalForm: SmzFormBuilder<TFormResponse>, defaultProductivityData: ScenarioProductivityData): SmzForm<TFormResponse> {

  return generalForm.group('Dados de Produtividade')
    .radioGroup('overrideProductivity', 'Sobrepor produtividade importada', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
      .setLayout('EXTRA_LARGE', 'col-12')
      .setLayout('LARGE', 'col-12')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .overrideResponseFormat('IdOnly')
      .validators().required().input
      .group
    .number('floor', 'Piso', defaultProductivityData.floor)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('equipment', 'Equipamento', defaultProductivityData.equipment)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('bulkhead', 'Antepara', defaultProductivityData.bulkhead)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('structure', 'Estrutura', defaultProductivityData.structure)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('ceiling', 'Teto', defaultProductivityData.ceiling)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('stairs', 'Escada', defaultProductivityData.stairs)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('supports', 'Suporte', defaultProductivityData.supports)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('guardrail', 'Guarda-Corpo', defaultProductivityData.guardrail)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .number('pippingValvesFlanges', 'TVF', defaultProductivityData.pippingValvesFlanges)
      .setLayout('EXTRA_LARGE', 'col-2')
      .setLayout('LARGE', 'col-2')
      .setLayout('MEDIUM', 'col-4')
      .setLayout('SMALL', 'col-4')
      .setFraction(1,2)
      .setVisibilityFunction((values) => values.overrideProductivity === true)
      .validators()
        .range(0, 100)
        .required().input
      .group
    .form
    .build();
}

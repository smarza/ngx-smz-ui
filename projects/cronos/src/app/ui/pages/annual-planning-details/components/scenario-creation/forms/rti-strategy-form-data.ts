import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { FixedTeamData } from '@models/fixed-team-data';
import { CreateScenarioWithRtiStrategy } from '@models/create-scenario-with-rti-strategy';
import { getFixedTeamFormData } from './fixed-team-form-data';
import { ModelConstants } from '@models/model-constants';
import { buildProductivityFormData } from './productivity-form-data';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';

export function getRtiStrategyFormData(annualPlanning: AnnualPlanningDetails): StrategyFormData<CreateScenarioWithRtiStrategy, FixedTeamData> {

  const generalForm = new SmzFormBuilder<CreateScenarioWithRtiStrategy>()
    .group('Dados Gerais')
      .text(nameof<CreateScenarioWithRtiStrategy>('name'), 'Nome')
        .setLayout('EXTRA_LARGE', 'col-6')
        .setLayout('LARGE', 'col-6')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .form
    .group()
      .radioGroup(nameof<CreateScenarioWithRtiStrategy>('defaultCorrosion'), 'Ignorar sistemas abaixo do índice padrão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-4')
        .setLayout('LARGE', 'col-4')
        .setLayout('MEDIUM', 'col-8')
        .setLayout('SMALL', 'col-8')
        .validators().required().input
        .group
      .radioGroup(nameof<CreateScenarioWithRtiStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-4')
        .setLayout('SMALL', 'col-4')
        .validators().required().input
        .group
      .radioGroup(nameof<CreateScenarioWithRtiStrategy>('ignoreCorrosionGoal'), 'Ignorar Meta de Corrosão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .validators().required().input
        .group
      .number(nameof<CreateScenarioWithRtiStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', 0)
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .customizeStyles('p-5')
        .setFraction(1,2)
        .setVisibilityFunction((values) => values.ignoreCorrosionGoal === false)
        .validators()
          .range(0, 100)
          .required().input
        .group
      .form;

  const productivityForm = buildProductivityFormData(generalForm, annualPlanning.defaultProductivityData);

  const teamForm = getFixedTeamFormData();

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(true);

  return {
    strategyName: 'RtiStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForm: teamForm
  };
}

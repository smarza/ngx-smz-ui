import { CreateScenarioWithCorrosionGoalStrategy } from '@models/create-scenario-with-corrosion-goal-strategy';
import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ModelConstants } from '@models/model-constants';
import { VariableTeamData } from '@models/variable-team-data';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { buildProductivityFormData } from './productivity-form-data';
import { getVariableTeamFormData } from './variable-team-form-data';

export function getCorrosionGoalStrategyFormData(annualPlanning: AnnualPlanningDetails): StrategyFormData<CreateScenarioWithCorrosionGoalStrategy, VariableTeamData> {

  const generalForm = new SmzFormBuilder<CreateScenarioWithCorrosionGoalStrategy>()
    .group('Dados Gerais')
      .text(nameof<CreateScenarioWithCorrosionGoalStrategy>('name'), 'Nome')
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
      .radioGroup(nameof<CreateScenarioWithCorrosionGoalStrategy>('defaultCorrosion'), 'Ignorar sistemas abaixo do índice padrão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-4')
        .setLayout('LARGE', 'col-4')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .validators().required().input
        .group
      .radioGroup(nameof<CreateScenarioWithCorrosionGoalStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .validators().required().input
        .group
      .number(nameof<CreateScenarioWithCorrosionGoalStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', 0)
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .setFraction(1,2)
        .validators()
          .range(0, 100)
          .required().input
        .group
      .form;

  const productivityForm = buildProductivityFormData(generalForm, annualPlanning.defaultProductivityData);

  const teamForm = getVariableTeamFormData();

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(true);

  return {
    strategyName: 'CorrosionGoalStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForm: teamForm
  };
}
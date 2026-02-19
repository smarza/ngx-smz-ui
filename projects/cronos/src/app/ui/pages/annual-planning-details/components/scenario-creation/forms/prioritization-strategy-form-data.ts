import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { CreateScenarioWithPrioritizationStrategy } from '@models/create-scenario-with-prioritization-strategy';
import { ModelConstants } from '@models/model-constants';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { buildProductivityFormData } from './productivity-form-data';
import { VariableTeamData } from '@models/variable-team-data';
import { getVariableTeamFormData } from './variable-team-form-data';

export function getPrioritizationStrategyFormData(annualPlanning: AnnualPlanningDetails): StrategyFormData<CreateScenarioWithPrioritizationStrategy, VariableTeamData> {

  const generalForm = new SmzFormBuilder<CreateScenarioWithPrioritizationStrategy>()
    .group('Dados Gerais')
      .text(nameof<CreateScenarioWithPrioritizationStrategy>('name'), 'Nome')
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
      .radioGroup(nameof<CreateScenarioWithPrioritizationStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], false)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .validators().required().input
        .group
      .number(nameof<CreateScenarioWithPrioritizationStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', 0)
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
    strategyName: 'PrioritizationStrategy',
    hidroblastLocationsTree,
    hidroblastLocations,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForm: teamForm
  };
}

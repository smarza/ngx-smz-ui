import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData, TeamForm } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ModelConstants } from '../../../../../../models/model-constants';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { ScenarioDetails } from '@models/scenario-details';
import { UpdateScenarioWithPrioritizationStrategy } from '@models/update-scenario-with-prioritization-strategy';
import { buildProductivityFormData } from './productivity-form-data';
import { VariableTeamData } from '@models/variable-team-data';
import { getDefaultVariableTeamForm, getVariableTeamFormWithData } from './variable-team-form-data';
import { Team } from '@models/team';

export function getPrioritizationStrategyFormData(scenario: ScenarioDetails, annualPlanning: AnnualPlanningDetails, isEditing: boolean): StrategyFormData<UpdateScenarioWithPrioritizationStrategy, VariableTeamData> {

  const generalForm = new SmzFormBuilder<UpdateScenarioWithPrioritizationStrategy>()
    .group('Dados Gerais')
      .setLayout('EXTRA_LARGE', 'col-4')
      .setLayout('LARGE', 'col-4')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .text(nameof<UpdateScenarioWithPrioritizationStrategy>('name'), 'Nome', scenario.name)
        .disable(!isEditing)
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .form
    .group()
      .radioGroup(nameof<UpdateScenarioWithPrioritizationStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.considerProximity)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<UpdateScenarioWithPrioritizationStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', scenario.corrosionGoal)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .setFraction(1,2)
        .disable(!isEditing)
        .validators()
          .range(0, 100)
          .required().input
        .group
      .form;

  const productivityForm = buildProductivityFormData(generalForm, annualPlanning.defaultProductivityData, scenario, isEditing);

  const teamForms: TeamForm<VariableTeamData>[] = [];

  scenario.teams.forEach((team: Team) => {
    const teamData = getVariableTeamFormWithData(team, isEditing);
    teamForms.push({teamData: teamData, hidroblastLocations: team.hidroblastLocations});
  });

  const defaultTeamForm = getDefaultVariableTeamForm();

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(isEditing);

  return {
    strategyName: 'PrioritizationStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultTeamForm: defaultTeamForm,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForms: teamForms
  };
}

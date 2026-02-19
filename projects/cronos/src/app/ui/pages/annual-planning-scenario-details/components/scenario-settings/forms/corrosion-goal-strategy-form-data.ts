import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData, TeamForm } from '../models/strategy-form-data';
import { ModelConstants } from '../../../../../../models/model-constants';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { ScenarioDetails } from '@models/scenario-details';
import { UpdateScenarioWithCorrosionGoalStrategy } from '@models/update-scenario-with-corrosion-goal-strategy';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { VariableTeamData } from '@models/variable-team-data';
import { buildProductivityFormData } from './productivity-form-data';
import { getDefaultVariableTeamForm, getVariableTeamFormWithData } from './variable-team-form-data';
import { Team } from '@models/team';

export function getCorrosionGoalStrategyFormData(scenario: ScenarioDetails, annualPlanning: AnnualPlanningDetails, isEditing: boolean): StrategyFormData<UpdateScenarioWithCorrosionGoalStrategy, VariableTeamData> {

  const generalForm = new SmzFormBuilder<UpdateScenarioWithCorrosionGoalStrategy>()
    .group('Dados Gerais')
      .text(nameof<UpdateScenarioWithCorrosionGoalStrategy>('name'), 'Nome', scenario.name)
        .setLayout('EXTRA_LARGE', 'col-4')
        .setLayout('LARGE', 'col-4')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
        .disable(!isEditing)
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .form
    .group()
      .radioGroup(nameof<UpdateScenarioWithCorrosionGoalStrategy>('defaultCorrosion'), 'Ignorar sistemas abaixo do índice padrão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.defaultCorrosion)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .radioGroup(nameof<UpdateScenarioWithCorrosionGoalStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.considerProximity)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<UpdateScenarioWithCorrosionGoalStrategy>('corrosionGoal'), 'Meta de Corrosão (%) 111', scenario.corrosionGoal)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-12')
        .setLayout('SMALL', 'col-12')
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

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(isEditing);

  const defaultTeamForm = getDefaultVariableTeamForm();

  return {
    strategyName: 'CorrosionGoalStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultTeamForm: defaultTeamForm,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForms: teamForms
  };
}

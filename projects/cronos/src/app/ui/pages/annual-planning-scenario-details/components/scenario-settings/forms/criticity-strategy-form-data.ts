import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData, TeamForm } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ModelConstants } from '../../../../../../models/model-constants';
import { FixedTeamData } from '@models/fixed-team-data';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { ScenarioDetails } from '@models/scenario-details';
import { getDefaultFixedTeamForm, getFixedTeamFormWithData } from './fixed-team-form-data';
import { UpdateScenarioWithCriticityStrategy } from '@models/update-scenario-with-criticity-strategy';
import { buildProductivityFormData } from './productivity-form-data';
import { Team } from '@models/team';

export function getCriticityStrategyFormData(scenario: ScenarioDetails, annualPlanning: AnnualPlanningDetails, isEditing: boolean): StrategyFormData<UpdateScenarioWithCriticityStrategy, FixedTeamData> {

  const generalForm = new SmzFormBuilder<UpdateScenarioWithCriticityStrategy>()
    .group('Dados Gerais')
      .setLayout('EXTRA_LARGE', 'col-4')
      .setLayout('LARGE', 'col-4')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .text(nameof<UpdateScenarioWithCriticityStrategy>('name'), 'Nome', scenario.name)
        .disable(!isEditing)
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .form
    .group()
      .radioGroup(nameof<UpdateScenarioWithCriticityStrategy>('defaultCorrosion'), 'Ignorar sistemas abaixo do índice padrão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.defaultCorrosion)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .radioGroup(nameof<UpdateScenarioWithCriticityStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.considerProximity)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-4')
        .setLayout('SMALL', 'col-4')
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<UpdateScenarioWithCriticityStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', scenario.corrosionGoal)
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

  const teamForms: TeamForm<FixedTeamData>[] = [];

  scenario.teams.forEach((team: Team) => {
    const teamData = getFixedTeamFormWithData(team, isEditing);
    teamForms.push({teamData: teamData, hidroblastLocations: team.hidroblastLocations});
  });

  const defaultTeamForm = getDefaultFixedTeamForm();

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(isEditing);

  return {
    strategyName: 'CriticityStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultTeamForm: defaultTeamForm,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForms: teamForms
  };
}

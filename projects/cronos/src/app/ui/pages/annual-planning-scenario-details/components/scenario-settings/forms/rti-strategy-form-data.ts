import { nameof, SmzFormBuilder } from '@ngx-smz/core';
import { StrategyFormData, TeamForm } from '../models/strategy-form-data';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ModelConstants } from '@models/model-constants';
import { FixedTeamData } from '@models/fixed-team-data';
import { getHidroblastTreeState } from '../../../../../functions/get-hidroblast-tree-state';
import { getHidroblastLocations } from '../../../../../functions/get-hidroblast-locations';
import { ScenarioDetails } from '@models/scenario-details';
import { getDefaultFixedTeamForm, getFixedTeamFormWithData } from './fixed-team-form-data';
import { UpdateScenarioWithRtiStrategy } from '@models/update-scenario-with-rti-strategy';
import { buildProductivityFormData } from './productivity-form-data';
import { Team } from '@models/team';

export function getRtiStrategyFormData(scenario: ScenarioDetails, annualPlanning: AnnualPlanningDetails, isEditing: boolean): StrategyFormData<UpdateScenarioWithRtiStrategy, FixedTeamData> {

  const generalForm = new SmzFormBuilder<UpdateScenarioWithRtiStrategy>()
    .group('Dados Gerais')
      .setLayout('EXTRA_LARGE', 'col-4')
      .setLayout('LARGE', 'col-4')
      .setLayout('MEDIUM', 'col-12')
      .setLayout('SMALL', 'col-12')
      .text(nameof<UpdateScenarioWithRtiStrategy>('name'), 'Nome', scenario.name)
        .disable(!isEditing)
        .validators()
          .length(ModelConstants.shortName.minLength, ModelConstants.shortName.maxLength)
          .required().input
        .group
      .form
    .group()
      .radioGroup(nameof<UpdateScenarioWithRtiStrategy>('defaultCorrosion'), 'Ignorar sistemas abaixo do índice padrão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.defaultCorrosion)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-3')
        .setLayout('LARGE', 'col-3')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .radioGroup(nameof<UpdateScenarioWithRtiStrategy>('considerProximity'), 'Considerar proximidade', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.considerProximity)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .radioGroup(nameof<UpdateScenarioWithRtiStrategy>('ignoreCorrosionGoal'), 'Ignorar Meta de Corrosão', [{id: true, name: 'Sim'}, {id: false, name: 'Não'}], scenario.ignoreCorrosionGoal)
        .overrideResponseFormat('IdOnly')
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .disable(!isEditing)
        .validators().required().input
        .group
      .number(nameof<UpdateScenarioWithRtiStrategy>('corrosionGoal'), 'Meta de Corrosão (%)', scenario.corrosionGoal)
        .setLayout('EXTRA_LARGE', 'col-2')
        .setLayout('LARGE', 'col-2')
        .setLayout('MEDIUM', 'col-6')
        .setLayout('SMALL', 'col-6')
        .setFraction(1,2)
        .disable(!isEditing)
        .setVisibilityFunction((values) => values.ignoreCorrosionGoal === false)
        .validators()
          .range(0, 100)
          .required().input
        .group
      .form;

  const productivityForm = buildProductivityFormData(generalForm, annualPlanning.defaultProductivityData, scenario, isEditing);

  const teamForms: TeamForm<FixedTeamData>[] = [];

  scenario.teams.forEach((team: Team): void => {
    const teamData = getFixedTeamFormWithData(team, isEditing);
    teamForms.push({teamData: teamData, hidroblastLocations: team.hidroblastLocations});
  });

  const defaultTeamForm = getDefaultFixedTeamForm();

  const hidroblastLocations = getHidroblastLocations(annualPlanning);

  const hidroblastLocationsTree = getHidroblastTreeState(isEditing);

  return {
    strategyName: 'RtiStrategy',
    hidroblastLocationsTree: hidroblastLocationsTree,
    hidroblastLocations: hidroblastLocations,
    defaultTeamForm: defaultTeamForm,
    defaultHidroblastLocations: annualPlanning.defaultHidroblastLocations,
    generalForm: productivityForm,
    teamForms: teamForms
  };
}

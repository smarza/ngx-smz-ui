/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { CreateScenarioWithCorrosionGoalStrategy } from '@models/create-scenario-with-corrosion-goal-strategy';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { ScenarioCreationComponent } from '../scenario-creation.component';
import { VariableTeamData } from '@models/variable-team-data';
import { getCorrosionGoalStrategyFormData } from '../forms/corrosion-goal-strategy-form-data';

export function showCorrosionGoalScenarioCreationDialog(store: Store): void {
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  const formData: StrategyFormData<CreateScenarioWithCorrosionGoalStrategy, VariableTeamData> = getCorrosionGoalStrategyFormData(annualPlanningData);

  dialogs.open(new SmzDialogBuilder<{ general: CreateScenarioWithCorrosionGoalStrategy, teams: VariableTeamData[] }>()
    .setTitle('Meta de Corrosão')
    .closeOnEscape()
    .setLayout('EXTRA_LARGE', 'col-8')
    .setLayout('LARGE', 'col-8')
    .setLayout('MEDIUM', 'col-10')
    .setLayout('SMALL', 'col-10')
    .component(ScenarioCreationComponent)
      .addInput('data', formData)
      .addOutput('general', () => {})
      .addOutput('teams', () => {})
      .dialog
    .buttons()
      .confirm()
        .callback(response => {
          // Todo: Criar opção na lib para passar o id do objeto selecionado no radio group
          const payload: CreateScenarioWithCorrosionGoalStrategy = {
            ...response.general,
            annualPlanningId: annualPlanningData.id,
            teamData: response.teams,
          };
          store.dispatch(new AnnualPlanningsFtActions.CreateScenarioWithCorrosionGoalStrategy(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
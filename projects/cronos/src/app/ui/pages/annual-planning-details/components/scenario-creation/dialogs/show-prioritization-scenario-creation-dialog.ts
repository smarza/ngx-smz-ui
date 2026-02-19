/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { ScenarioCreationComponent } from '../scenario-creation.component';
import { CreateScenarioWithPrioritizationStrategy } from '@models/create-scenario-with-prioritization-strategy';
import { getPrioritizationStrategyFormData } from '../forms/prioritization-strategy-form-data';
import { VariableTeamData } from '@models/variable-team-data';

export function showPrioritizationScenarioCreationDialog(store: Store): void {
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  const formData: StrategyFormData<CreateScenarioWithPrioritizationStrategy, VariableTeamData> = getPrioritizationStrategyFormData(annualPlanningData);

  dialogs.open(new SmzDialogBuilder<{ general: CreateScenarioWithPrioritizationStrategy, teams: VariableTeamData[] }>()
    .setTitle('NdC E&P')
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
          const payload: CreateScenarioWithPrioritizationStrategy = {
            ...response.general,
            annualPlanningId: annualPlanningData.id,
            teamData: response.teams,
          };
          store.dispatch(new AnnualPlanningsFtActions.CreateScenarioWithPrioritizationStrategy(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
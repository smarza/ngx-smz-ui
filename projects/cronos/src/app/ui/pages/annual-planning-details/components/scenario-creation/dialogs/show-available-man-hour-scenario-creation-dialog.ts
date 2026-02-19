/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';
import { StrategyFormData } from '../models/strategy-form-data';
import { ScenarioCreationComponent } from '../scenario-creation.component';
import { CreateScenarioWithAvailableManHourStrategy } from '@models/create-scenario-with-available-man-hour-strategy';
import { FixedTeamData } from '@models/fixed-team-data';
import { getAvailableManHourStrategyFormData } from '../forms/available-man-hour-strategy-form-data';

export function showAvailableManHourScenarioCreationDialog(store: Store): void {
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  const formData: StrategyFormData<CreateScenarioWithAvailableManHourStrategy, FixedTeamData> = getAvailableManHourStrategyFormData(annualPlanningData);

  dialogs.open(new SmzDialogBuilder<{ general: CreateScenarioWithAvailableManHourStrategy, teams: FixedTeamData[] }>()
    .setTitle('HH Disponível')
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
          const payload: CreateScenarioWithAvailableManHourStrategy = {
            ...response.general,
            annualPlanningId: annualPlanningData.id,
            teamData: response.teams,
          };
          store.dispatch(new AnnualPlanningsFtActions.CreateScenarioWithAvailableManHourStrategy(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
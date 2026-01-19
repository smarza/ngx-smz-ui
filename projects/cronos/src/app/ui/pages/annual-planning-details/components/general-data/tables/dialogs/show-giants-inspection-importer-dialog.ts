import { CalculatePreliminaryResults } from '@models/calculate-preliminary-results';
import { Store } from '@ngxs/store';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';

export function showGiantsInspectionImporterDialog(planningId: string, store: Store): void {
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<CalculatePreliminaryResults>()
    .setTitle('Atualizar dados de inspeção do Giants')
    .message('Ao atualizar este tipo de dado, o planejamento atual será recalculado e o navegador o ' +
      'redirecionará para a tela de listagem de planejamentos após a confirmação da operação.')
    .closeOnEscape()
    .setLayout('EXTRA_LARGE', 'col-6')
    .setLayout('LARGE', 'col-6')
    .setLayout('MEDIUM', 'col-8')
    .setLayout('SMALL', 'col-8')
    .buttons()
      .confirm()
        .callback(() => {
          const payload: CalculatePreliminaryResults = {
            annualPlanningId: planningId,
            fetchNewWeatherData: false,
            fetchNewGiantsData: true
          };
          store.dispatch(new AnnualPlanningsActions.CalculatePreliminaryResults(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
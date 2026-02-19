import { CalculatePreliminaryResults } from '@models/calculate-preliminary-results';
import { Store } from '@ngxs/store';
import { AnnualPlanningsActions } from '@state/database/annual-plannings/annual-plannings.actions';
import { SmzDialogsService, GlobalInjector, SmzDialogBuilder } from '@ngx-smz/core';

export function showRecalculateWithWeatherUpdateDialog(store: Store, planningId: string): void {

  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<CalculatePreliminaryResults>()
    .setTitle('Atualização de dados climáticos')
    .message('<p>Ao confirmar, o planejamento atual será recalculado com os novos dados climáticos.</p>' +
      '<p>Você será redirecionado para a tela de listagem de planejamentos.</p>')
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
            fetchNewWeatherData: true,
            fetchNewGiantsData: false
          };
          store.dispatch(new AnnualPlanningsActions.CalculatePreliminaryResults(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
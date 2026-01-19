import { UpdateRtiData } from '@models/update-rti-data';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { SmzDialogsService, GlobalInjector, SmzDialogBuilder, nameof } from '@ngx-smz/core';

export function showRtiUploadDialog(store: Store, planningId: string): void {

  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<UpdateRtiData>()
    .setTitle('Atualizar dados de RTI')
    .message('<p>Ao confirmar, o planejamento atual será recalculado com os novos dados de RTI.</p>' +
      '<p class="mb-4">Você será redirecionado para a tela de listagem de planejamentos.</p>')
    .closeOnEscape()
    .setLayout('EXTRA_LARGE', 'col-8')
    .setLayout('LARGE', 'col-8')
    .setLayout('MEDIUM', 'col-10')
    .setLayout('SMALL', 'col-10')
    .form()
      .group()
        .file(nameof<UpdateRtiData>('rtiSpreadsheetData'), 'Planilha com os dados da RTI')
          .acceptXlsx()
          .maxDisplayName(40)
          .validators().required().input
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback(response => {
          const payload: UpdateRtiData = {
            annualPlanningId: planningId,
            rtiSpreadsheetData: response.rtiSpreadsheetData,
          };
          store.dispatch(new AnnualPlanningsFtActions.UpdateRtiData(payload));
        })
        .buttons
      .dialog
    .build()
  );
}
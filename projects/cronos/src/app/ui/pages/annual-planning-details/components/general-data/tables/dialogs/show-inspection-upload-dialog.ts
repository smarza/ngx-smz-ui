import { UpdateInspectionDataFromSpreadsheet } from '@models/update-inspection-data-from-spreadsheet';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { SmzDialogsService, GlobalInjector, SmzDialogBuilder, nameof } from '@ngx-smz/core';
import { showInspectionSpreadsheetErrorsDialog } from './show-inspection-spreadsheet-errors-dialog';

export function showInspectionUploadDialog(planningId: string, store: Store): void {
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  dialogs.open(new SmzDialogBuilder<UpdateInspectionDataFromSpreadsheet>()
    .setTitle('Atualizar dados de inspeção')
    .message('<p>Ao confirmar, o planejamento atual será recalculado com os novos dados de inspeção.</p>' +
      '<p class="mb-4">Você será redirecionado para a tela de listagem de planejamentos.</p>')
    .closeOnEscape()
    .setLayout('EXTRA_LARGE', 'col-6')
    .setLayout('LARGE', 'col-6')
    .setLayout('MEDIUM', 'col-8')
    .setLayout('SMALL', 'col-8')
    .form()
      .group()
        .file(nameof<UpdateInspectionDataFromSpreadsheet>('inspectionSpreadsheetData'), 'Planilha com os dados da inspeção')
          .validators().required().input
          .acceptXlsx()
          .maxDisplayName(40)
          .group
        .form
      .dialog
    .buttons()
      .confirm()
        .callback(response => {
          const payload: UpdateInspectionDataFromSpreadsheet = {
            annualPlanningId: planningId,
            inspectionSpreadsheetData: response.inspectionSpreadsheetData,
          };
          store.dispatch(new AnnualPlanningsFtActions.UpdateInspectionDataFromSpreadsheet(payload)).subscribe(() => {
            if (store.selectSnapshot(AnnualPlanningsFtSelectors.errors).length > 0) {
              showInspectionSpreadsheetErrorsDialog();
            }
          });
        })
        .buttons
      .dialog
    .build()
  );
}
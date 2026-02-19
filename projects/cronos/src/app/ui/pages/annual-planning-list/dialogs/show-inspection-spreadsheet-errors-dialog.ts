import { GlobalInjector, nameof, SmzDialogBuilder, SmzDialogsService, SmzTableBuilder } from '@ngx-smz/core';
import { Store } from '@ngxs/store';
import { AnnualPlanningsSelectors } from '@state/database/annual-plannings/annual-plannings.selectors';
import { InspectionSpreadsheetParseErrors } from '@models/inspection-spreadsheet-parse-errors';

export function showInspectionSpreadsheetErrorsDialog(): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  const message = '<span class="text-red-500 text-bold gap-2"><i class="fa-solid fa-circle-info mr-2"></i>Não foi possível criar o Planejamento Anual com a planilha de inspeção fornecida</span>';

  dialogs.open( new SmzDialogBuilder()
    .setTitle('Foram encontrados erros')
    .message([message, 'Por favor, corrija os erros abaixo e tente novamente.'])
    .setLayout('EXTRA_SMALL', 'col-12')
    .setLayout('EXTRA_LARGE', 'col-8')
    .setMinHeight(70)
    .table(store.select(AnnualPlanningsSelectors.errors),
      new SmzTableBuilder<string>()
        .setToolbarAlignment('end')
        .enableGlobalFilter()
        .usePagination()
        .setPaginationDefaultRows(10)
        .useStrippedStyle()
        .setSize('small')
        .columns()
          .text(nameof<InspectionSpreadsheetParseErrors>('error'), 'Erro', '16em')
            .disableFilter()
            .columns
          .table
        .build())
    .buttons()
      .confirm().hide()
        .buttons
      .cancel('FECHAR')
        .buttons
      .dialog
    .build());
}
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ClaimDefinitions } from '@models/claim-definitions';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { SmzFilterType, SmzTableBuilder, SmzTableState, nameof } from '@ngx-smz/core';
import { showRtiUploadDialog } from './dialogs/show-rti-upload-dialog';
import { RtiInformation } from '@models/rti-information';

export function getRtiDataTableState(store: Store): SmzTableState {
  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  return new SmzTableBuilder()
    .addSource(store.select(AnnualPlanningsFtSelectors.getRtiData))
    .setToolbarAlignment('end')
    .enableClearFilters()
    .enableGlobalFilter()
    .useTableEmptyMessage()
    .disableRowHoverEffect()
    .useStrippedStyle()
    .usePagination()
    .setPaginationPageOptions([10, 15, 50, 100, 500])
    .setPaginationDefaultRows(10)
    .setSize('small')
    .buttons()
      .add('ENVIAR NOVA PLANILHA', () => showRtiUploadDialog(store, annualPlanningData.id))
        .setIcon('fa-solid fa-upload')
        .customAuthorize(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)
        .buttons
      .table
    .columns()
      .text(nameof<RtiInformation>('id'), 'Identificador')
        .columns
      .text(nameof<RtiInformation>('nim'), 'N-I-M')
        .columns
      .text(nameof<RtiInformation>('code'), 'Código')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .date(nameof<RtiInformation>('originalExpirationDate'), 'Vencimento Original')
        .setDateFormat('shortDate')
        .columns
      .table
    .build();
}
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ClaimDefinitions } from '@models/claim-definitions';
import { InspectionEntity } from '@models/inspection-entity';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { SmzFilterType, SmzTableBuilder, SmzTableState, nameof } from '@ngx-smz/core';
import { showInspectionUploadDialog } from './dialogs/show-inspection-upload-dialog';
import { showGiantsInspectionImporterDialog } from './dialogs/show-giants-inspection-importer-dialog';

export function getInspectionDataTableState(store: Store): SmzTableState {
  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  return new SmzTableBuilder()
    .addSource(store.select(AnnualPlanningsFtSelectors.getInspectionData))
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
      .add('ENVIAR NOVA PLANILHA', () => showInspectionUploadDialog(annualPlanningData.id, store))
        .setIcon('fa-solid fa-upload')
        .customAuthorize(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)
        .setVisibility(() => !annualPlanningData.isInspectionDataFromGiants)
        .buttons
      .add('ATUALIZAR DADOS DE INSPEÇÃO DO GIANTS', () => showGiantsInspectionImporterDialog(annualPlanningData.id, store))
        .setIcon('fa-solid fa-arrows-rotate')
        .customAuthorize(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)
        .setVisibility(() => annualPlanningData.isInspectionDataFromGiants)
        .buttons
      .table
    .columns()
      .text(nameof<InspectionEntity>('id'), 'Identificador')
        .columns
      .text(nameof<InspectionEntity>('corrosion'), 'Corrosão')
        .columns
      .text(nameof<InspectionEntity>('characteristic'), 'Característica')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('area'), 'Área')
        .columns
      .text(nameof<InspectionEntity>('year'), 'Ano')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('initialYear'), 'Ano Inicial')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('exposure'), 'Exposição')
        .columns
      .text(nameof<InspectionEntity>('elevation'), 'Elevação')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('location'), 'Localização')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('function'), 'Função')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .text(nameof<InspectionEntity>('productivity'), 'Produtividade')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns
      .table
    .build();
}
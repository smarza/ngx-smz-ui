import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { ClaimDefinitions } from '@models/claim-definitions';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { SmzTableBuilder, SmzTableState, nameof, namesof } from '@ngx-smz/core';
import { showRecalculateWithWeatherUpdateDialog } from './dialogs/show-recalculate-with-weather-update-dialog';
import { WeatherDataItem } from '@models/weather-data-item';
import { WeatherDataDetails } from '@models/weather-data-details';

export function getWeatherDataTableState(store: Store): SmzTableState {
  const annualPlanningData: AnnualPlanningDetails = store.selectSnapshot(AnnualPlanningsFtSelectors.getDetails);

  return new SmzTableBuilder()
    .addSource(store.select(AnnualPlanningsFtSelectors.getWeatherData))
    .setToolbarAlignment('end')
    .useTableEmptyMessage()
    .disableRowHoverEffect()
    .useStrippedStyle()
    .setSize('small')
    .buttons()
      .add('ATUALIZAR DADOS', () => showRecalculateWithWeatherUpdateDialog(store, annualPlanningData.id))
        .setIcon('fa-solid fa-upload')
        .customAuthorize(ClaimDefinitions.MANAGE_ANNUAL_PLANNING)
        .setVisibility(() => annualPlanningData.hasWeatherData)
        .buttons
      .table
    .columns()
      .text(nameof<WeatherDataItem>('name'), 'Fator Climático')
        .disableFilter()
        .disableSort()
        .columns
      .text(namesof<WeatherDataItem, WeatherDataDetails>('details', 'tableData'), 'Média Anual')
        .disableFilter()
        .disableSort()
        .columns
      .text(namesof<WeatherDataItem, WeatherDataDetails>('details', 'errorMessage'), 'Aviso')
        .addStyles('text-red-500')
        .disableFilter()
        .disableSort()
        .columns
      .table
    .build();
}
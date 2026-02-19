import { GlobalInjector, nameof, SmzDialogBuilder, SmzDialogsService, SmzFilterType, SmzTableBuilder } from '@ngx-smz/core';
import { Store } from '@ngxs/store';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { AnnualPlanningHistory } from '@models/annual-planning-history';
import { AnnualPlanningsFtActions } from '@state/features/annual-plannings/annual-plannings.actions';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';

export function showAnnualPlanningHistoryDialog(annualPlanning: AnnualPlanningListItem): void {

  const store: Store = GlobalInjector.instance.get(Store);
  const dialogs: SmzDialogsService = GlobalInjector.instance.get(SmzDialogsService);

  store.dispatch(new AnnualPlanningsFtActions.LoadHistory(annualPlanning.id))
    .forEach(() => {

      dialogs.open( new SmzDialogBuilder()
        .setTitle('Histórico de Planejamento Anual')
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-10')
        .setMinHeight(60)
        .table(store.select(AnnualPlanningsFtSelectors.history),
          new SmzTableBuilder<AnnualPlanningHistory>()
            .setTitle(`${annualPlanning.plant.name} (${annualPlanning.year}) | ${annualPlanning.description}`)
            .enableGlobalFilter()
            .enableClearFilters()
            .useStrippedStyle()
            .usePagination()
            .setPaginationDefaultRows(15)
            .setPaginationPageOptions([5, 15, 50])
            .setSize('small')
            .columns()
              .text(nameof<AnnualPlanningHistory>('description'), 'Descrição')
                .columns
              .date(nameof<AnnualPlanningHistory>('creationDate'), 'Data', '14em')
                .columns
              .text(nameof<AnnualPlanningHistory>('username'), 'Usuário', '14em')
                .setFilter(SmzFilterType.MULTI_SELECT_STRING)
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
    });
}

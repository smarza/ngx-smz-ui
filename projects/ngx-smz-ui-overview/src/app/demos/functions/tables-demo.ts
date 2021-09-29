import { DemoKeys } from '@demos/demo-keys';
import { SmzTableBuilder } from 'ngx-smz-ui';

export const TablesDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.TABLE_UI_DEFINITIONS]: () => {
    return new SmzTableBuilder('entity')
        .setTitle('Demo From Ui Definitions With Fluent')
        .enableClearFilters()
        .enableColumnVisibility()
        .setEmptyFeedbackMessage('Lista vazia')
        .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
        .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
        .usePagination()
        .setPaginationDefaultRows(50)
        .setCustomInitialSorting({ field: 'number', order: -1 })
        .useStrippedStyle()
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
  },
}


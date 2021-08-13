import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from 'ngx-smz-dialogs';
import { SmzTableBuilder } from 'ngx-smz-ui';
import { DemoFeatureSelectors } from '../../state/demo/demo.selectors';

const service = GlobalInjector.instance.get(SmzDialogsService);
const store = GlobalInjector.instance.get(Store);

export const TablesDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.TABLE_UI_DEFINITIONS]: () => {
    // service.open(
    //   new SmzDialogBuilder<void>()
    //     .setTitle(`Calendar Demo`)
    //     .setLayout('EXTRA_SMALL', 'col-12')
    //     .setLayout('LARGE', 'col-4')
    //     .setLayout('EXTRA_LARGE', 'col-3')
    //     .table(
    //         store.select(DemoFeatureSelectors.all),
    //         new SmzTableBuilder('entity')
    //         .setTitle('Demo From Ui Definitions With Fluent')
    //         .enableClearFilters()
    //         .enableColumnVisibility()
    //         .setEmptyFeedbackMessage('Lista vazia')
    //         .setEmptyFeedbackExtraInfo('Clique abaixo para carregar novos dados.')
    //         .addEmptyFeedbackButton('Atualizar', () => console.log('---'))
    //         .usePagination()
    //         .setPaginationDefaultRows(50)
    //         .setCustomInitialSorting({ field: 'number', order: -1 })
    //         .useStrippedStyle()
    //         .menu()
    //           .item('Consultar')
    //             .setCallback((event: any) => console.log('---'))
    //             .menu
    //           .table
    //       .build())
    //     .buttons()
    //       .confirm()
    //         .dependsOnValidation()
    //         .buttons
    //       .dialog
    //   .build()
    // );
  },
}


import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzFilterType, SmzMultiTablesBuilder, SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs/internal/Observable';
import { TablesDemo } from './tables-demo';
import { EditableTablePartialData, EditableTablePartialLevels } from '@demos/data/tables/editable-table-partial-data';
import { of } from 'rxjs';

const store = GlobalInjector.instance.get(Store);

export const MultiTablesDemo: { [key: string]: { items$: Observable<any[]>, code: () => void } } = {
  //
  [DemoKeys.MULTI_TABLES_BASIC]: {
    items$: null,
    code: () => {
    return new SmzMultiTablesBuilder()
      //  FIRST TAB
      .tab('First')
        .allowDuplication()
        // .header()
        //   .setIcon('fa-solid fa-bug')
        //   .header
        .table(
          of(EditableTablePartialData),
          new SmzTableBuilder()
            .setTitle('Amostragens')
            .enableGlobalFilter()
            .useTableEmptyMessage()
            .setEmptyFeedbackMessage('<b>Nenhuma amostragem localizada.</b><br><div class="text-sm mt-2">Refine sua busca para filtrar as amostragens.</div>')
            .usePagination()
            .setPaginationDefaultRows(10)
            .setCustomInitialSorting({ field: 'number', order: -1 })
            .useStrippedStyle()
            .disableRowHoverEffect()
            .enableColumnVisibility()
            .menu()
            .item('Consultar')
              .setCallback((event: any) => console.log('---'))
              .menu
            .table
            .columns()
              .text('module', 'Módulo', '12em')
                .columns
              .text('section', 'Seção', '12em')
                .columns
              .dataTransform('level.name', 'Característica', (value, item) => item.isNotApplicable ? 'N/A' : `<strong>${value}</strong>`, '16m')
                .setFilter(SmzFilterType.MULTI_SELECT)
                .editable()
                  .dropdown('level')
                  .setOptions(EditableTablePartialLevels)
                  .column
                .columns
              .table
            .build())
        .tab

      //  SECOND TAB
      .tab('Second')
        // .header()
        //   .setIcon('fa-solid fa-bug')
        //   .header
        .table(
          of([
            { name: 'name 1', company: 'company D' },
            { name: 'name 2', company: 'company A' },
            { name: 'name 2', company: 'company B' },
            { name: 'name 2', company: 'company C' },
            { name: 'name 3', company: 'company E' }
          ]),
          TablesDemo[DemoKeys.TABLE_VIEWPORT_PERSISTENCE].code() as SmzTableState
        )
        .tab

      // THIRD TAB
      .tab('Third')
        // .header()
        //   .setIcon('fa-solid fa-bug')
        //   .header
        .allowClose()
        .table(
          of(EditableTablePartialData),
          TablesDemo[DemoKeys.TABLE_EDITABLE_PARTIAL].code() as SmzTableState
        )
        .tab
      .build()
  }
  },
}

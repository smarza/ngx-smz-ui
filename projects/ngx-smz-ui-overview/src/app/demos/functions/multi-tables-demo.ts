import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzMultiTablesBuilder, SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs/internal/Observable';
import { TablesDemo } from './tables-demo';
import { EditableTablePartialData } from '@demos/data/tables/editable-table-partial-data';
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
        .header()
          .setIcon('fa-solid fa-bug')
          .header
        .table(
          of(EditableTablePartialData),
          TablesDemo[DemoKeys.TABLE_EDITABLE_PARTIAL].code() as SmzTableState
        )
        .tab

      //  SECOND TAB
      .tab('Second')
        .header()
          .setIcon('fa-solid fa-bug')
          .header
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
        .header()
          .setIcon('fa-solid fa-bug')
          .header
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

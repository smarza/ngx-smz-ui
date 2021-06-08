import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { SmzFilterType, SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { EditableSaveEvent } from 'projects/ngx-smz-ui/src/lib/modules/smz-tables/models/editable-model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DemoItem } from '../../models/demo';
import { DemoFeatureActions } from '../../state/demo/demo.actions';
import { DemoFeatureSelectors } from '../../state/demo/demo.selectors';
import { DemoTableDataService } from '../demo-tables/data-service/demo-tables-data-service';

@Component({
  selector: 'demo-editable-table',
  templateUrl: 'demo-editable-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoEditableTableComponent implements OnInit {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;
  public tableState: SmzTableState;
  constructor(private dataService: DemoTableDataService, private store: Store) {
    this.store.dispatch(new DemoFeatureActions.LoadAll());
  }

  ngOnInit() {
    this.setupTableState();
  }

  test(event: any) {
    console.log(event);
  }

  public save(event: EditableSaveEvent[]): void {
    console.log('onSave Event', event);
  }

  public setupTableState(): void {
    this.tableState = new SmzTableBuilder()
      .allowRemove()
      .setUpdateDispatch(DemoFeatureActions.Update)
      .setCreationDispatch(DemoFeatureActions.Create)
      .setTitle('Demo Editable Table')
      .menu()
      .item('Log State')
        .setCallback((): void => console.log(this.tableState))
          .menu
        .table
      .columns()
        .text('name', 'Name', '20em')
          .editable()
            .column
          .disableFilter()
          .columns
        .text('company', 'Company', '20em')
          .disableFilter()
          .disableSort()
          .editable()
            .column
          .columns
        .text('country.name', 'Country', '20em')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .editable()
            .dropdown('country')
              .setSelector(DemoFeatureSelectors.countries)
            .column
          .columns
        .table
      .build();
  }
}
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzTableState, SmzTableBuilder, SmzFilterType } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
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
    this.setupFromUiDefinitions();
    // this.setupFromUiDefinitionsWithCustomization();
  }

  test(event: any) {
    console.log(event);
  }

  public onUpdate(event: any[]): void {
    // console.log('onUpdate Event', event);
  }

  public setupFromUiDefinitions(): void {
    this.tableState = new SmzTableBuilder('entity')
        .setTitle('Demo From Ui Definitions')
        .setUpdateAction(DemoFeatureActions.Update)
        .setCreationAction(DemoFeatureActions.Create)
        .setRemoveAction(DemoFeatureActions.Remove)
      .build();
  }

  public setupFromUiDefinitionsWithCustomization(): void {

    this.tableState = new SmzTableBuilder('entity')
      .setTitle('Demo From Ui Definitions With Customization')
      .setUpdateAction(DemoFeatureActions.Update)
      .setCreationAction(DemoFeatureActions.Create)
      .setRemoveAction(DemoFeatureActions.Remove)
      .usePagination()
      .columns()
        .text('name', 'Name', '10em')
          .disableFilter()
          .columns
        .text('company', 'Company', '20em')
          .disableFilter()
          .disableSort()
          .columns
        .text('country.name', 'Country', '15em')
          .setFilter(SmzFilterType.DROPDOWN)
          .disableSort()
          .columns
        .table
      .build();
  }

}
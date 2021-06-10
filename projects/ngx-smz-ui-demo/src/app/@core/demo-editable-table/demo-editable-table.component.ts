import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzTableState, SmzTableBuilder } from 'ngx-smz-ui';
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
    this.setupTableState();
  }

  test(event: any) {
    console.log(event);
  }

  public onUpdate(event: any[]): void {
    // console.log('onUpdate Event', event);
  }

  public setupTableState(): void {

    this.tableState = new SmzTableBuilder('entity')
        .setTitle('Demo Editable Table')
        .setUpdateAction(DemoFeatureActions.Update)
        .setCreationAction(DemoFeatureActions.Create)
        .setRemoveAction(DemoFeatureActions.Remove)
      .build();


      // this.tableState = new SmzTableBuilder('entity')
      //   .setTitle('Demo Editable Table')
      //   .setUpdateDispatch(DemoFeatureActions.Update)
      //   .setCreationDispatch(DemoFeatureActions.Create)
      //   .setRemoveDispatch(DemoFeatureActions.Remove)
      //   .columns()
      //     .text('name', 'Name', '10em')
      //       .disableFilter()
      //       .columns
      //     .text('company', 'Company', '20em')
      //       .disableFilter()
      //       .disableSort()
      //       .columns
      //     .text('country.name', 'Country', '15em')
      //       .setFilter(SmzFilterType.DROPDOWN)
      //       .disableSort()
      //       .columns
      //     .table
      // .build();

    // this.tableState = new SmzTableBuilder()
    //   .setUpdateDispatch(DemoFeatureActions.Update)
    //   .setCreationDispatch(DemoFeatureActions.Create)
    //   .setRemoveDispatch(DemoFeatureActions.Remove)
    //   .setTitle('Demo Editable Table')
    //   // .menu()
    //   // .item('Log State')
    //   //   .setCallback((): void => console.log(this.tableState))
    //   //     .menu
    //   //   .table
    //   .columns()
    //     .text('name', 'Name', '20em')
    //       .editable()
    //         .column
    //       .disableFilter()
    //       .columns
    //     .text('company', 'Company', '20em')
    //       .disableFilter()
    //       .disableSort()
    //       .editable()
    //         .column
    //       .columns
    //     .text('country.name', 'Country', '20em')
    //       .setFilter(SmzFilterType.MULTI_SELECT)
    //       .disableSort()
    //       .editable()
    //         .dropdown('country')
    //           .setSelector(CountriesDbSelectors.all)
    //         .column
    //       .columns
    //     .table
    //   .build();
  }
}

// this.tableState = new SmzTableBuilder()
// // .editable
// //   .allowRemove()
// //   .setUpdateDispatch(DemoFeatureActions.Update)
// //   .setCreationDispatch(DemoFeatureActions.Create)
// // .table
// .setTitle('Demo Editable Table')
// .menu()
// .item('Log State')
// .setCallback((): void => console.log(this.tableState))
//   .menu
// .table
// .columns()
// .text('name', 'Name', '20em')
//   .editable()
//     .column
//   .disableFilter()
//   .columns
// .text('company', 'Company', '20em')
//   .disableFilter()
//   .disableSort()
//   .editable()
//     .column
//   .columns
// .text('country.name', 'Country', '20em')
//   .setFilter(SmzFilterType.MULTI_SELECT)
//   .disableSort()
//   .editable()
//     .dropdown('country')
//       .optionsFromList([])
//       .optionsFromSelector(DemoFeatureSelectors.countries)
//     .column
//   .columns
// .table
// .build();

// validorsFromStore(entity)
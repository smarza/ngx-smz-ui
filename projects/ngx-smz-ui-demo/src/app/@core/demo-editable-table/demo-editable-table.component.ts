import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzTableState, SmzTableBuilder, SmzFilterType } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DemoItem } from '../../models/demo';
import { DemoFeatureActions } from '../../state/demo/demo.actions';
import { DemoFeatureSelectors } from '../../state/demo/demo.selectors';
import { DemoTableDataService } from '../demo-tables/data-service/demo-tables-data-service';
import { ServiceDetails } from '../demo-tables/data-service/service';
import { ServicesService } from '../demo-tables/data-service/services.service';

@Component({
  selector: 'demo-editable-table',
  templateUrl: 'demo-editable-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoEditableTableComponent implements OnInit {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;
  public services$: Observable<ServiceDetails[]>;
  public tableState: SmzTableState;
  constructor(private dataService: DemoTableDataService, private service: ServicesService, private store: Store) {
    // this.store.dispatch(new DemoFeatureActions.LoadAll());

    this.services$ = this.service.all(); // .pipe(tap(x => console.log(x)));
  }

  ngOnInit() {
    // this.setup();
    // this.setupFromUiDefinitions();
    // this.setupFromUiDefinitionsWithCustomization();
    this.setupServiceWithCustomization();
  }

  test(event: any) {
    console.log(event);
  }

  public onUpdate(event: any): void {
    // console.log('onUpdate Event', event);
  }

  public setupFromUiDefinitions(): void {
    this.tableState = new SmzTableBuilder('service')
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

  public setup(): void {

    this.tableState = new SmzTableBuilder()
      .setTitle('Demo From Ui Definitions With Customization')
      .setUpdateAction(DemoFeatureActions.Update)
      .setCreationAction(DemoFeatureActions.Create)
      .setRemoveAction(DemoFeatureActions.Remove)
      .usePagination()
      .customizeEditableResults((data: any) => {
        console.log('customizing', data);
        return data;
      })
      .columns()
        .text('name', 'Name', '10em')
          .editable()
            .text()
          .column
          .disableFilter()
          .columns
        .text('company', 'Company', '20em')
          .disableFilter()
          .disableSort()
          .columns
        .text('country.name', 'Country', '15em')
          .setFilter(SmzFilterType.DROPDOWN)
          .disableSort()
          .editable()
            .dropdown('country')
            .setOptions([ { name: 'Não gera comissão', id: true }, { name: 'Gera Comissão', id: false }])
          .column
          .columns
        .table
      .build();

    console.log(this.tableState);
  }

  public setupServiceWithCustomization(): void {


    this.tableState = new SmzTableBuilder('role')
      .setTitle('Serviços')
      .setCreationAction(DemoFeatureActions.Create, 'TEST_CREATION')
      .setUpdateAction(DemoFeatureActions.Update, 'TEST_UPDATE')
      .setRemoveAction(DemoFeatureActions.Remove, 'TEST_DELETE')
      .customizeEditableResults((data: any) => {
        console.log('data', data);
        return data;
      })
      .enableGlobalFilter()
      .enableClearFilters()
      .usePagination()
      .setPaginationDefaultRows(20)
      // .setInitialSorting('description', 1)
      .useStrippedStyle()
      // .reorder('description', 'isActive', 'cost', 'price')
      // .columns()
      //   .icon('isActive', 'Status', '6em')
      //     .columns
      //   .text('description', 'Serviço', '20em')
      //     .columns
      //   .custom('cost', 'Custo', '8em')
      //     .columns
      //   .custom('price', 'Venda', '8em')
      //     .columns
      //   .text('type.name', 'Tipo', '8em')
      //     .columns
      //   .icon('unchargeable', 'Não Calculável', '6em')
      //     .columns
      //   .icon('visibleToCustomer', 'Via do Cliente', '6em')
      //     .columns
      //   .text('acceptanceTerm', 'Termo', '12em')
      //     .columns
      //   .table
      .build();

      // console.log(this.tableState);
  }

}
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzTableState, SmzTableBuilder, SmzFilterType, SimpleNamedEntity } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { DemoFeatureActions } from '@states/demo/demo.actions';
import { DemoTableDataService } from '../demo-tables/data-service/demo-tables-data-service';
import { ServiceDetails } from '../demo-tables/data-service/service';
import { ServicesService } from '../demo-tables/data-service/services.service';
import { CountriesDbSelectors } from '@states/database/countries/countries.selectors';


@Component({
  selector: 'demo-editable-table',
  templateUrl: 'demo-editable-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoEditableTableComponent implements OnInit {
  @Select(CountriesDbSelectors.all) public items$: Observable<SimpleNamedEntity[]>;
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
        .editable()
          .setUpdateAction(DemoFeatureActions.Update)
          .setCreationAction(DemoFeatureActions.Create)
          .setRemoveAction(DemoFeatureActions.Remove)
          .table
      .build();
  }

  public setupFromUiDefinitionsWithCustomization(): void {

    this.tableState = new SmzTableBuilder('entity')
      .setTitle('Demo From Ui Definitions With Customization')
      .editable()
        .setUpdateAction(DemoFeatureActions.Update)
        .setCreationAction(DemoFeatureActions.Create)
        .setRemoveAction(DemoFeatureActions.Remove)
        .table
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
      .editable()
        .setUpdateAction(DemoFeatureActions.Update)
        .setCreationAction(DemoFeatureActions.Create)
        .setRemoveAction(DemoFeatureActions.Remove)
        .addMappingResults((data: any) => { return data; })
        .table
      .usePagination()
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


    this.tableState = new SmzTableBuilder('entity')
      .setTitle('Entidades')
      .editable()
        .setCreationAction(DemoFeatureActions.Create)
        .setUpdateAction(DemoFeatureActions.Update)
        .setRemoveAction(DemoFeatureActions.Remove)
        .addMappingResults((data: any) => { return data; })
        .table
      .build();

      // console.log(this.tableState);
  }

}
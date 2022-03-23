import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzTableState, SmzFilterType, SmzTableBuilder } from 'ngx-smz-ui';
import { DemoTableDataService } from '../data-service/demo-tables-data-service';
import { Select, Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { DemoItem } from '@models/demo';
import { DemoFeatureActions } from '@states/demo/demo.actions'
import { SimpleNamedEntity } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-signalr-table',
  templateUrl: './demo-signalr-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoSignalRTableComponent implements OnInit, OnDestroy {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;
  public tableState: SmzTableState = this.buildTableState();
  public timer;
  constructor(private store: Store) {
    this.timer = setInterval(() => {
      this.store.dispatch(new DemoFeatureActions.LoadAllSignalRDemo());
    }, 2000);
  }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    return new SmzTableBuilder()
    .setTitle('SignalR Demo')
    .enableClearFilters()
    .enableColumnVisibility()
    .useStrippedStyle()
    .menu()
      .item('Consultar')
        .setCallback((event: any) => console.log('---'))
        .menu
      .table
    .columns()
      .text('name', 'Name')
        .disableFilter()
        .columns
      .text('country.name', 'Country')
        .setFilter(SmzFilterType.MULTI_SELECT)
        .disableSort()
        .columns
      .text('sample', 'Amostragem')
        .columns
      .dataTransform('country.name.id', 'Super Country 2', (country: SimpleNamedEntity, row: any) => `test: ${country?.name?.toUpperCase()}`)
        .columns
      .dataTransform('country', 'Super Country', (country: SimpleNamedEntity, row: any) => `super: ${country?.name?.toUpperCase()}`)
        .setFilter(SmzFilterType.MULTI_SELECT)
        .columns
      .dataTransform('roles', 'Perfis', (roles: SimpleNamedEntity[], row: any) => { return roles.map(x => x.name).join(', '); })
        .setFilter(SmzFilterType.MULTI_SELECT_ARRAY)
        .columns
      .table
    .build();
  }

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }


}
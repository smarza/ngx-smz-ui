import { Component, OnInit } from '@angular/core';
import { SmzEditableType } from 'ngx-smz-ui';
import { SimpleNamedEntity } from 'ngx-smz-dialogs';
import { SmzFilterType, SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { EditableSaveEvent } from 'projects/ngx-smz-ui/src/lib/modules/smz-tables/models/editable-model';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DemoTableDataService } from '../demo-tables/data-service/demo-tables-data-service';

@Component({
  selector: 'demo-editable-table',
  templateUrl: 'demo-editable-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoEditableTableComponent implements OnInit {
  public items$: Observable<any>;
  public tableState: SmzTableState;
  public countries: SimpleNamedEntity[] = [];
  constructor(private dataService: DemoTableDataService) {
    this.items$ = this.dataService.getCustomersLarge();

    this.dataService
      .getCustomersLarge()
      .pipe(take(1))
      .subscribe((x: any[]) => {
        this.countries = x.map(item => item.country);
        this.setupTableState();
      });
  }

  ngOnInit() {
  }

  public save(event: EditableSaveEvent[]): void {
    console.log('onSave Event', event);
  }

  public setupTableState(): void {
    this.tableState = new SmzTableBuilder()
      .setTitle('Demo Editable Table')
      // .customizeEditableEventResults((data: any, change) => {

      //   console.log('data', data);
      //   console.log('before', change.before);
      //   console.log('after', change.after);

      //   return {
      //     name: data.name,
      //     company: data.company,
      //     countryId: data.country.id,
      //   };
      // })
      .menu()
      .item('Log State')
        .setCallback((): void => console.log(this.tableState))
          .menu
        .table
      .columns()
        .text('name', 'Name', '20em')
          .makeEditable()
          .disableFilter()
          .disableSort()
          .columns
        .text('company', 'Company', '20em')
          .makeEditable()
          .disableFilter()
          .disableSort()
          .columns
        .text('country.name', 'Country', '20em')
          .makeEditable(SmzEditableType.DROPDOWN, null, 'country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .table
      .build();
  }
}
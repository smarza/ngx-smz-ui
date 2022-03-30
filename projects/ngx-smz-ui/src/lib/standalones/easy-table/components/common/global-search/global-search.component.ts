import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, Subject } from 'rxjs';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';
import { isEmpty } from '../../../../../builders/common/utils';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'et-global-search',
  template: `
  <span class="p-input-icon-left w-full">
    <i class="pi pi-search"></i>
    <input class="w-full" type="text" pInputText [placeholder]="state.locale.globalSearch.placeholder" [(ngModel)]="value" (ngModelChange)="onSearchChange($event)"/>
  </span>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

@UntilDestroy()
export class GlobalSearchComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  public value: string;
  dataChanged = new Subject<string>();
  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit()
  {
    this.dataChanged
      .pipe( untilDestroyed(this), debounceTime(600))
      .subscribe((value) => {
        this.search(value);
      })
  }

  public onSearchChange(event: any): void {
    this.dataChanged.next(event);
  }

  public search(value: string): void {

    if (isEmpty(value)) {
      this.dataSource.viewport.tableData = this.dataSource.viewport.allTableData;
      this.dataSource.updatePaginator(1, false);
    }
    else {

      const words = value.toLocaleLowerCase().replace(/\s+/g, ' ').trim().split(' ');

      let matchs = this.dataSource.viewport.globalSearchData;

      words.forEach(word => {
        matchs = matchs.filter(x => x.searchData.toLocaleLowerCase().includes(word));
      });

      const newTableData = matchs.map(x => x.item);

      this.dataSource.viewport.tableData = newTableData;
      this.dataSource.updatePaginator(1, false);
    }

    this.cdf.markForCheck();
  }

}
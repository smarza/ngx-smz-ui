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
        this.dataSource.executeGlobalSearch(value, true, false);
      })
  }

  public onSearchChange(event: any): void {
    this.dataChanged.next(event);
  }


}
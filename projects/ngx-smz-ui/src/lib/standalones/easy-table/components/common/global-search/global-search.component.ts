import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, Subject } from 'rxjs';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';

@Component({
  selector: 'et-global-search',
  template: `
  <span class="p-input-icon-left w-full p-input-icon-right">
    <i class="pi pi-search"></i>
    <input class="w-full" type="text" pInputText [placeholder]="state.locale.globalSearch.placeholder" [(ngModel)]="value" (ngModelChange)="onSearchChange($event)"/>
    <i *ngIf="value != null && value !== ''" class="pi pi-times cursor-pointer" (click)="clear()"></i>
    <i *ngIf="value == null || value === ''" class=""></i>
  </span>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

@UntilDestroy()
export class GlobalSearchComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  public value: string;
  private dataChanged = new Subject<string>();
  constructor() { }

  ngOnInit()
  {
    this.dataChanged
      .pipe( untilDestroyed(this), debounceTime(600))
      .subscribe((value) => {
        this.dataSource.executeGlobalSearch(value, true);
      })
  }

  public onSearchChange(event: any): void {
    this.dataChanged.next(event);
  }

  public clear(): void {
    this.value = '';
    this.onSearchChange('');
  }


}
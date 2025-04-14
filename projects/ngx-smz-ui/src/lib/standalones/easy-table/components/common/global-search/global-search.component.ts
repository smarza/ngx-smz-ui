import { ChangeDetectionStrategy, Component, inject, DestroyRef, Input, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'et-global-search',
    template: `
  <p-iconfield class="p-input-icon-left w-full p-input-icon-right">
      <p-inputicon styleClass="pi pi-search" />
      <input class="w-full" type="text" pInputText [placeholder]="state.locale.globalSearch.placeholder" [(ngModel)]="value" (ngModelChange)="onSearchChange($event)"/>
      <i *ngIf="value != null && value !== ''" class="pi pi-times cursor-pointer" (click)="clear()"></i>
      <i *ngIf="value == null || value === ''" class=""></i>
  </p-iconfield>
`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class GlobalSearchComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  public value: string;
  private dataChanged = new Subject<string>();

  public ngOnInit(): void
  {
    this.dataChanged
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(this.state.globalSearch.interval))
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
import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmzEasyTableHeader, SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';

@Component({
    selector: 'et-sort',
    template: `
  @if (header.sort != null) {
    @if (!header.sort.isActive) {
      <i class="fa-solid fa-sort cursor-pointer" (click)="toggle()"></i>
    }
    @if (header.sort.isActive) {
      @if (header.sort.order === 1) {
        <i class="fa-solid fa-arrow-up-a-z cursor-pointer" (click)="toggle()"></i>
      }
      @if (header.sort.order === -1) {
        <i class="fa-solid fa-sort-alpha-down-alt cursor-pointer" (click)="toggle()"></i>
      }
    }
  }
  `,
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})

export class SortComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public header: SmzEasyTableHeader;
  @Input() public dataSource: TableDataSourceService;

  constructor(private cdf: ChangeDetectorRef) { }

  ngOnInit()
  {

  }

  public toggle(): void {

    if (this.state.desktop.head.sortMode === 'single') {
      this.state.desktop.head.headers.forEach(header => {
        if (header.sort != null) {
          header.sort.isActive = false;
        }
      });
    }

    if (this.header.sort.order === 1) {
      this.header.sort.order = -1;
      this.header.sort.isActive = true;
    }
    else if (this.header.sort.order === -1 && this.header.sort.isActive) {
      this.header.sort.isActive = false;
    }
    else {
      this.header.sort.order = 1;
      this.header.sort.isActive = true;
    }

    this.dataSource.internalSource$.next(this.dataSource.viewport.original);

    this.cdf.markForCheck();
  }

};
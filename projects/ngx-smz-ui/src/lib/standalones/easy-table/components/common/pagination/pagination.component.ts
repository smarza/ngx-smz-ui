import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';
import { paginator } from '../../../services/table-data-utils';

@Component({
  selector: 'et-pagination',
  templateUrl: 'pagination.component.html'
})

export class PaginationComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  constructor() { }

  ngOnInit() {
  }

  public next(): void {
    this.dataSource.viewport.paginator = paginator(
      this.dataSource.viewport.allTableData,
      this.dataSource.viewport.paginator.nextPage,
      this.state.paginator.itemsPerPage,
      this.state.paginator.maxVisiblePages
    );

    console.log(this.dataSource.viewport.paginator);
  }

  public previous(): void {
    this.dataSource.viewport.paginator = paginator(
      this.dataSource.viewport.allTableData,
      this.dataSource.viewport.paginator.prePage,
      this.state.paginator.itemsPerPage,
      this.state.paginator.maxVisiblePages
    );

    console.log(this.dataSource.viewport.paginator);
  }

  public goTo(page: number): void {
    this.dataSource.viewport.paginator = paginator(
      this.dataSource.viewport.allTableData,
      page,
      this.state.paginator.itemsPerPage,
      this.state.paginator.maxVisiblePages
    );

    console.log(this.dataSource.viewport.paginator);
  }

}

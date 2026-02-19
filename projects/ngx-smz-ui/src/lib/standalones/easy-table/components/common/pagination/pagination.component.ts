import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../../services/table-data-source.service';

@Component({
    selector: 'et-pagination',
    templateUrl: 'pagination.component.html',
    standalone: false
})

export class PaginationComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  constructor() { }

  ngOnInit() {
  }

  public next(): void {
    this.dataSource.createPaginator(this.dataSource.viewport.paginator.nextPage, false);
  }

  public previous(): void {
    this.dataSource.createPaginator(this.dataSource.viewport.paginator.prePage, false);
  }

  public goTo(page: number): void {
    this.dataSource.createPaginator(page, false);
  }

}

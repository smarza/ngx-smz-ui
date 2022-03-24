import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzEasyTableState } from '../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../services/table-data-source.service';

@Component({
  selector: 'smz-easy-table',
  templateUrl: 'smz-easy-table.component.html',
  providers: [TableDataSourceService]
})

export class SmzEasyTableComponent implements OnInit, OnDestroy {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: Observable<any[]>;
  constructor(public cdr: ChangeDetectorRef, public dataService: TableDataSourceService) {
  }

  ngOnInit() {
    this.dataService.cdr = this.cdr;
    this.dataService.source$ = this.dataSource;
    this.dataService.state = this.state;
    this.dataService.setupListener();
  }

  public ngOnDestroy(): void {
    this.dataService.disconnect();
  }
}
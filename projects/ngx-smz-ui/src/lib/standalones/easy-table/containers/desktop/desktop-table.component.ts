import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../models/smz-easy-table-state';
import { TableDataSourceService } from '../../services/table-data-source.service';

@Component({
  selector: 'et-desktop-table',
  templateUrl: 'desktop-table.component.html'
})

export class DesktopTableComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  constructor() { }

  ngOnInit() { }
}
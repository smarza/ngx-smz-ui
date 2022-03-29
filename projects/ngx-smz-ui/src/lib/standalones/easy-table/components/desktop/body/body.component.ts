import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableContentType } from '../../../models/smz-easy-table-contents';
import { SmzEasyTableData } from '../../../models/smz-easy-table-data';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';
import { TableContentService } from '../../../services/table-content.service';
import { TableDataSourceService } from '../../../services/table-data-source.service';

@Component({
  selector: '[et-desktop-body]',
  templateUrl: 'body.component.html'
})

export class DesktopBodyComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public dataSource: TableDataSourceService;
  @Input() public contentService: TableContentService;
  public type = SmzEasyTableContentType;
  constructor() { }

  ngOnInit() {
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { SmzTableContextColumn } from '../../models/table-column';

@Component({
  selector: 'smz-table-content-actions',
  templateUrl: 'table-content-actions.component.html',
  host: { class: 'grid grid-nogutter items-center justify-start gap-2' }
})

export class SmzTableContentActionsComponent implements OnInit {
  @Input() public col: SmzTableContextColumn;
  @Input() public contentTypes;
  @Input() public item;
  @Input() public rowIndex;
  constructor() { }

  ngOnInit() { }
}
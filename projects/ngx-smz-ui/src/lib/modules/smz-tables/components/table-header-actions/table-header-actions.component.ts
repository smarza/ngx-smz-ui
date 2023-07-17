import { Component, Input, OnInit } from '@angular/core';
import { SmzTableContextColumn } from '../../models/table-column';

@Component({
  selector: 'smz-table-header-actions',
  templateUrl: 'table-header-actions.component.html',
  host: { class: 'grid grid-nogutter items-center justify-start gap-2' }
})

export class SmzTableHeaderActionsComponent implements OnInit {
  @Input() public col: SmzTableContextColumn;
  constructor() { }

  ngOnInit() { }
}
import { Component, Input, OnInit } from '@angular/core';
import { SmzTableContextColumn } from '../../models/table-column';

@Component({
  selector: 'smz-table-content',
  templateUrl: 'table-content.component.html',
  // host: { class: 'grid grid-nogutter items-center justify-start gap-2' }
})

export class SmzTableContentComponent implements OnInit {
  @Input() public col: SmzTableContextColumn;
  @Input() public contentTypes;
  @Input() public item;
  @Input() public rowIndex;
  @Input() public contentTemplate;
  constructor() { }

  ngOnInit() {
  }
}
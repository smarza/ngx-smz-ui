import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableContentType } from '../../../models/smz-easy-table-contents';
import { SmzEasyTableData } from '../../../models/smz-easy-table-data';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';

@Component({
  selector: '[et-desktop-body]',
  templateUrl: 'body.component.html'
})

export class DesktopBodyComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public data: SmzEasyTableData[];
  public type = SmzEasyTableContentType;
  constructor() { }

  ngOnInit() {
  }
}

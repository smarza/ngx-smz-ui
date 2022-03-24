import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../models/smz-easy-table-state';

@Component({
  selector: 'et-mobile-table',
  templateUrl: 'mobile-table.component.html'
})

export class MobileTableComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  @Input() public data: any[];
  constructor() { }

  ngOnInit() { }
}
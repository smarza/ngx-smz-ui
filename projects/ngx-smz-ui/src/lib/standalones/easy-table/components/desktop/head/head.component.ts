import { Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';

@Component({
  selector: '[et-desktop-head]',
  templateUrl: 'head.component.html'
})

export class DesktopHeadComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  constructor() { }

  ngOnInit() { }
}
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentTable } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SmzDocumentTableComponent implements OnInit {
  @Input() public data: SmzDocumentTable;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
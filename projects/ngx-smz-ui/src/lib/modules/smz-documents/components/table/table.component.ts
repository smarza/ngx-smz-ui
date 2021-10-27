import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentTable } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-table',
  templateUrl: 'table.component.html'
})

export class SmzDocumentTableComponent implements OnInit {
  @Input() public data: SmzDocumentTable;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
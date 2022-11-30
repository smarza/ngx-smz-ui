import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentHiddenBreak } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-hidden-break',
  templateUrl: 'hidden-break.component.html'
})

export class SmzDocumentHiddenBreakComponent implements OnInit {
  @Input() public data: SmzDocumentHiddenBreak;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
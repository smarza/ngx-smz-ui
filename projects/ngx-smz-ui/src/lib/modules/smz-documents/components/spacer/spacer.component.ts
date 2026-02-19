import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentSpacer } from '../../models/smz-document-features';

@Component({
    selector: 'smz-document-spacer',
    templateUrl: 'spacer.component.html',
    standalone: false
})

export class SmzDocumentSpacerComponent implements OnInit {
  @Input() public data: SmzDocumentSpacer;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
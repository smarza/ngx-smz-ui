import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentDivider } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-divider',
  templateUrl: 'divider.component.html'
})

export class SmzDocumentDividerComponent implements OnInit {
  @Input() public data: SmzDocumentDivider;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
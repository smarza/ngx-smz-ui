import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentTitle } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-feature-title',
  templateUrl: 'title.component.html'
})

export class SmzDocumentFeatureTitleComponent implements OnInit {
  @Input() public data: SmzDocumentTitle;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
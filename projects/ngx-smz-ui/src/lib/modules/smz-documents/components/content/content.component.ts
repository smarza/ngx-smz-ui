import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentContent } from '../../models/smz-document';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentFeatureDefinitions } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-content',
  templateUrl: 'content.component.html'
})

export class SmzDocumentContentComponent implements OnInit {
  @Input() public data: SmzDocumentContent;
  @Input() public config: SmzDocumentConfig;
  public featureDefinitions = SmzDocumentFeatureDefinitions;
  constructor() { }
  ngOnInit() { }
}
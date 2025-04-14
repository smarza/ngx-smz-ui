import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzDocumentContent, SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentFeatureDefinitions } from '../../models/smz-document-features';

@Component({
    selector: 'smz-document-content',
    templateUrl: 'content.component.html',
    styleUrls: ['content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class SmzDocumentContentComponent implements OnInit {
  @Input() public data: SmzDocumentContent;
  @Input() public config: SmzDocumentConfig;
  @Input() public state: SmzDocumentState;
  @Input() public isDebug: boolean;
  public featureDefinitions = SmzDocumentFeatureDefinitions;
  constructor() { }
  ngOnInit() { }

}
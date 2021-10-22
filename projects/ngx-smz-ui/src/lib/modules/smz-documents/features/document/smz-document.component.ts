import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentFeatureDefinitions } from '../../models/smz-document-features';

@Component({
  selector: 'smz-ui-document',
  templateUrl: 'smz-document.component.html'
})

export class SmzDocumentComponent implements OnInit {
  @Input() public state: SmzDocumentState;

  public featureDefinitions = SmzDocumentFeatureDefinitions;
  constructor() { }

  ngOnInit() {
    console.log(this.state);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentSubTitle } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-sub-title',
  templateUrl: 'sub-title.component.html'
})

export class SmzDocumentSubTitleComponent implements OnInit {
  @Input() public data: SmzDocumentSubTitle;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
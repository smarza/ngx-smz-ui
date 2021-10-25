import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentFieldsGroup } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-fields-group',
  templateUrl: 'fields-group.component.html'
})

export class SmzDocumentFieldsGroupComponent implements OnInit {
  @Input() public data: SmzDocumentFieldsGroup;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
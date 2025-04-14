import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentField } from '../../models/smz-document-features';

@Component({
    selector: 'smz-document-field',
    templateUrl: 'field.component.html',
    standalone: false
})

export class SmzDocumentFieldComponent implements OnInit {
  @Input() public data: SmzDocumentField;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
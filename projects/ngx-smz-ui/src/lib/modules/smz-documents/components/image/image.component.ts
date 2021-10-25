import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentImage } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-image',
  templateUrl: 'image.component.html'
})

export class SmzDocumentImageComponent implements OnInit {
  @Input() public data: SmzDocumentImage;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() { }
}
import { Component, Input } from '@angular/core';
import { SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentComponent } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-injectable',
  templateUrl: 'injectable.component.html'
})

export class SmzDocumentInjectableComponent {
  @Input() public data: SmzDocumentComponent;
  @Input() public config: SmzDocumentConfig;
  @Input() public state: SmzDocumentState;

}
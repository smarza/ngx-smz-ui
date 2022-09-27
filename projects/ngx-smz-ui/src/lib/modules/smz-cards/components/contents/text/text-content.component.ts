import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsTextContent } from '../../../models/smz-cards-contents';

@Component({
  selector: 'smz-text-content',
  templateUrl: 'text-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzTextContentComponent implements OnInit {
  @Input() public content: SmzCardsTextContent;
  @Input() public data: unknown;
  constructor() { }

  ngOnInit() {
  }
}
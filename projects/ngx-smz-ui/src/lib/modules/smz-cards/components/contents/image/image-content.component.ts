import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SmzCardsImageContent } from '../../../models/smz-cards-contents';

@Component({
    selector: 'smz-image-content',
    templateUrl: 'image-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SmzImageContentComponent implements OnInit {
  @Input() public content: SmzCardsImageContent<unknown>;
  @Input() public data: unknown;
  constructor() { }

  ngOnInit() {
  }
}
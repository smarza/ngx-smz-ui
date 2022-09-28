import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';

@Component({
  selector: 'smz-image-with-details-type',
  templateUrl: 'image-with-details-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzImageWithDetailsTypeComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
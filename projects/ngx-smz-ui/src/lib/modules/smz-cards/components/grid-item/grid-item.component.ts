import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsColumn, SmzCardsState } from '../../models/smz-cards-state';
import { SmzCardsContentType } from '../../models/smz-cards-contents';
import { SmzCardsType, SmzCardsView } from '../../models/smz-cards-types';

@Component({
  selector: 'smz-grid-item',
  templateUrl: 'grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmzGridItemComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public data: unknown;
  public type = SmzCardsType;
  public mode = SmzCardsView.GRID;
  constructor() { }

  ngOnInit() {
  }
}
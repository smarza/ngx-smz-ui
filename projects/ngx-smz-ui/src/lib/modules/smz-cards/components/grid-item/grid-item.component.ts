import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../models/smz-cards-state';
import { SmzCardsView } from '../../models/smz-cards-types';
import { SmzCardsTemplate } from '../../models/smz-cards-templates';

@Component({
  selector: 'smz-grid-item',
  templateUrl: 'grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmzGridItemComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public data: unknown;
  public type = SmzCardsTemplate;
  public mode = SmzCardsView.GRID;
  constructor() { }

  ngOnInit() {
  }
}
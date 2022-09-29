import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../models/smz-cards-state';
import { SmzCardsType, SmzCardsView } from '../../models/smz-cards-types';

@Component({
  selector: 'smz-list-item',
  templateUrl: 'list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'col-12' }
})

export class SmzListItemComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public data: unknown;
  public type = SmzCardsType;
  public mode = SmzCardsView.LIST;
  constructor() { }

  ngOnInit() { }
}
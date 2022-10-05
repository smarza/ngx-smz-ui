import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../models/smz-cards-state';
import { SmzCardsView } from '../../models/smz-cards-types';
import { SmzCardsTemplate } from '../../models/smz-cards-templates';

@Component({
  selector: 'smz-list-item',
  templateUrl: 'list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmzListItemComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public data: unknown;
  public type = SmzCardsTemplate;
  public mode = SmzCardsView.LIST;
  constructor() { }

  ngOnInit() { }
}
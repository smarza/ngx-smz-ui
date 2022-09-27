import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsColumn } from '../../models/smz-cards-state';

@Component({
  selector: 'smz-list-item',
  templateUrl: 'list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzListItemComponent implements OnInit {
  @Input() public columns: SmzCardsColumn[];
  @Input() public data: unknown;
  constructor() { }

  ngOnInit() { }
}
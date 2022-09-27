import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsColumn } from '../../models/smz-cards-state';
import { SmzCardsContentType } from '../../models/smz-cards-contents';

@Component({
  selector: 'smz-grid-item',
  templateUrl: 'grid-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'col-12 lg:col-6 xl:col-4 p-2' }
})

export class SmzGridItemComponent implements OnInit {
  @Input() public columns: SmzCardsColumn[];
  @Input() public data: unknown;
  public type = SmzCardsContentType;
  constructor() { }

  ngOnInit() {
  }
}
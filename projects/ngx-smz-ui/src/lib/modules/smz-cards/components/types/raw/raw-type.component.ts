import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../../models/smz-cards-state';
import { RawTemplate } from '../../../models/smz-cards-templates';
import { SmzCardsView } from '../../../models/smz-cards-types';

@Component({
  selector: 'smz-raw-type',
  templateUrl: 'raw-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzRawTypeComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public template: RawTemplate;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
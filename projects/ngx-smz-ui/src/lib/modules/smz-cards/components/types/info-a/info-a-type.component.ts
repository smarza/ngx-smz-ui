import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardsState } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';
import { InfoATemplate } from '../../../models/smz-cards-templates';

@Component({
  selector: 'smz-info-a-type',
  templateUrl: 'info-a-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzInfoATypeComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  @Input() public template: InfoATemplate;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  public InfoATemplate: InfoATemplate;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
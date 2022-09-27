import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzCardsState } from '../../models/smz-cards-state';

@Component({
  selector: 'smz-ui-cards',
  templateUrl: './smz-cards.component.html',
  styleUrls: ['./smz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class SmzCardsComponent implements OnInit {
  @Input() public state: SmzCardsState<unknown>;
  constructor() { }
  ngOnInit() {
    if (this.state?.isDebug) {
      console.log('state', this.state);
    }
  }
}
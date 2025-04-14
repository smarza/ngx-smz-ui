import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardActions } from '../../../models/smz-cards-state';
import { RawTemplate } from '../../../models/smz-cards-templates';
import { SmzCardsView } from '../../../models/smz-cards-types';

@Component({
    selector: 'smz-raw-type',
    templateUrl: 'raw-type.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SmzRawTypeComponent implements OnInit {
  @Input() public template: RawTemplate<unknown>;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  @Input() public isDebug: boolean = false;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
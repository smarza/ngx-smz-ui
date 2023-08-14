import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardActions } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';
import { InfoATemplate } from '../../../models/smz-cards-templates';

@Component({
  selector: 'smz-info-a-type',
  templateUrl: 'info-a-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzInfoATypeComponent implements OnInit {
  @Input() public template: InfoATemplate<unknown>;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  @Input() public isDebug: boolean = false;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  public InfoATemplate: InfoATemplate<unknown>;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
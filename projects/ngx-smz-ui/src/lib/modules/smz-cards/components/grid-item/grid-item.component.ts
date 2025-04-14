import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardActions } from '../../models/smz-cards-state';
import { SmzCardsView } from '../../models/smz-cards-types';
import { SmzCardsTemplate, SmzCardsTemplates } from '../../models/smz-cards-templates';

@Component({
    selector: 'smz-grid-item',
    templateUrl: 'grid-item.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: false
})

export class SmzGridItemComponent implements OnInit {
  @Input() public isDebug: boolean = false;
  @Input() public template: SmzCardsTemplates<unknown>;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  @Input() public data: unknown;
  public type = SmzCardsTemplate;
  public mode = SmzCardsView.GRID;
  constructor() { }

  ngOnInit() {
  }
}
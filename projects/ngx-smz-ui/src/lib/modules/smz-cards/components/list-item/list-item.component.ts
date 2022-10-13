import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardActions } from '../../models/smz-cards-state';
import { SmzCardsView } from '../../models/smz-cards-types';
import { SmzCardsTemplate, SmzCardsTemplates } from '../../models/smz-cards-templates';

@Component({
  selector: 'smz-list-item',
  templateUrl: 'list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SmzListItemComponent implements OnInit {
  @Input() public isDebug: boolean = false;
  @Input() public template: SmzCardsTemplates;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  @Input() public data: unknown;
  public type = SmzCardsTemplate;
  public mode = SmzCardsView.LIST;
  constructor() { }

  ngOnInit() { }
}
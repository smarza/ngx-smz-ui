import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzCardActions } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';
import { FlipCardTemplate } from '../../../models/smz-cards-templates';
import { SmzCardsImageContent, SmzCardsTextContent } from '../../../models/smz-cards-contents';

@Component({
  selector: 'smz-flip-card-type',
  templateUrl: 'flip-card-type.component.html',
  styleUrls: ['flip-card-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})

export class SmzFlipCardTypeComponent implements OnInit {
  @Input() public template: FlipCardTemplate<unknown>;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  @Input() public isDebug: boolean = false;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  public FlipCardTemplate: FlipCardTemplate<unknown>;
  public SmzCardsImageContent: SmzCardsImageContent<unknown>;
  public SmzCardsTextContent: SmzCardsTextContent<unknown>;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }

  public flip(): void {

    if (this.template.back == null) {
      return;
    }

    const changes = this.template._context.flip(this.data);
    this.template.onChange(changes);
  }
}
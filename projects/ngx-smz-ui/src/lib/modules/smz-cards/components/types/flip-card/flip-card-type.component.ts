import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzCardActions } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';
import { FlipCardTemplate } from '../../../models/smz-cards-templates';
import { SmzCardsImageContent, SmzCardsTextContent } from '../../../models/smz-cards-contents';

@Component({
  selector: 'smz-flip-card-type',
  templateUrl: 'flip-card-type.component.html',
  styleUrls: ['flip-card-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class SmzFlipCardTypeComponent implements OnInit {
  @Input() public template: FlipCardTemplate;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  @Input() public isDebug: boolean = false;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  public FlipCardTemplate: FlipCardTemplate;
  public SmzCardsImageContent: SmzCardsImageContent;
  public SmzCardsTextContent: SmzCardsTextContent;
  public modes = SmzCardsView;
  public isFlipped = false;
  constructor() { }

  ngOnInit() {
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped;
  }
}
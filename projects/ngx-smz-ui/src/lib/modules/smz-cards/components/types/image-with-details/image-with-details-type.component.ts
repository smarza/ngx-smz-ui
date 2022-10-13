import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzCardActions } from '../../../models/smz-cards-state';
import { SmzCardsView } from '../../../models/smz-cards-types';
import { ImageWithDetailsTemplate } from '../../../models/smz-cards-templates';
import { SmzCardsImageContent, SmzCardsTextContent } from '../../../models/smz-cards-contents';

@Component({
  selector: 'smz-image-with-details-type',
  templateUrl: 'image-with-details-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SmzImageWithDetailsTypeComponent implements OnInit {
  @Input() public template: ImageWithDetailsTemplate;
  @Input() public data: unknown;
  @Input() public mode: SmzCardsView;
  @Input() public isDebug: boolean = false;
  @Input() public buttons: SmzCardActions<any>;
  @Input() public menu: SmzCardActions<any>;
  public ImageWithDetailsTemplate: ImageWithDetailsTemplate;
  public SmzCardsImageContent: SmzCardsImageContent;
  public SmzCardsTextContent: SmzCardsTextContent;
  public modes = SmzCardsView;
  constructor() { }

  ngOnInit() {
  }
}
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { SmzCardsSource } from '../../../smz-cards/models/smz-cards-state';
import { SmzTimelineState } from '../../models/smz-timeline-state';

@Component({
    selector: 'smz-ui-timeline',
    templateUrl: './smz-timeline.component.html',
    styleUrls: ['./smz-timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class SmzTimelineComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTimelineState<any>;
  public headerTemplate: TemplateRef<any>;
  public contentTemplates: { type: string, template: TemplateRef<any> }[] = [];
  constructor(private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    if (this.state?.isDebug) {
      console.log('state', this.state);
    }
  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {

      const templateName = item.getType();
      if (templateName.includes('type')) {
        const type = templateName.split(':')[1];

        this.contentTemplates.push({
          type,
          template: item.template
        });
      }
      else {

        switch (templateName) {

          case 'header':
            this.headerTemplate = item.template;
            break;

        }

      }

    });
  }

  public updateMainSource(event: { value: SmzCardsSource<any> }): void {
    this.state.items$ = event.value.items$;
    this.cdr.markForCheck();
  }
}
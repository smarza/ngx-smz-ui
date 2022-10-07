import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { SmzCardsSource, SmzCardsState } from '../../models/smz-cards-state';

@Component({
  selector: 'smz-ui-cards',
  templateUrl: './smz-cards.component.html',
  styleUrls: ['./smz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class SmzCardsComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzCardsState<any>;
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
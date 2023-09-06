import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { PrimeTemplate } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { SmzCardsSource, SmzCardsState } from '../../models/smz-cards-state';

@Component({
  selector: 'smz-ui-cards',
  templateUrl: './smz-cards.component.html',
  styleUrls: ['./smz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})

export class SmzCardsComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild(DataView) public dataView: DataView;
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzCardsState<any>;
  public headerTemplate: TemplateRef<any>;
  public contentTemplates: { type: string, template: TemplateRef<any> }[] = [];
  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) { }
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

  public ngAfterViewInit(): void {

    if (!isEmpty(this.state.view.dataViewContentStyles)) {

      if (this.dataView != null) {
        const element = this.dataView.el.nativeElement as HTMLElement;
        const container = element.getElementsByClassName('p-dataview-content')[0];

        const styles = this.state.view.dataViewContentStyles.split(' ');
        styles.forEach(style => { this.renderer.addClass(container.firstChild, style) })
      }

    }

  }

  public updateMainSource(event: { value: SmzCardsSource<any> }): void {
    this.state.items$ = event.value.items$;
    this.cdr.markForCheck();
  }
}
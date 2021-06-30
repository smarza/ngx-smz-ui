import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'smz-data-info',
  templateUrl: 'smz-data-info.component.html'
})

export class SmzDataInfoComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public image: string;
  @Input() public message: string;
  @Input() public actions: { label: string, icon?: string, callback: () => void }[];
  @Input() public callbackInfo: string;
  @Input() public callbackLabel: string;
  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();
  public actionsTemplate: TemplateRef<any>;
  public ngOnInit(): void {

  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'actions':
          this.actionsTemplate = item.template;
          break;

      }
    });

  }
}
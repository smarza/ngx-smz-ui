import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { SmzControlType } from 'ngx-smz-dialogs';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { SmzTableConfig } from '../../models/table-config';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SmzTableComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public items: any[] = [];
  @Input() public config: SmzTableConfig;
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  public contentTemplate: TemplateRef<any>;
  public actionsTemplate: TemplateRef<any>;
  public selectedItems: any[];
  public currencyControlType = `${SmzControlType.CURRENCY}`;
  public calendarControlType = `${SmzControlType.CALENDAR}`;
  public textControlType = `${SmzControlType.TEXT}`;
  public dropDownControlType = `${SmzControlType.DROPDOWN}`;
  public multiSelectControlType = `${SmzControlType.MULTI_SELECT}`;

  constructor() {

  }

  ngOnInit(): void {
    // console.log('items', this.items);
  }

  public test(event: any): void
  {
    console.log(event);
  }


  public ngAfterContentInit() {
    // console.log('ngAfterContentInit', this.templates);
    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'actions':
          this.actionsTemplate = item.template;
          break;
      }
    });

  }

}

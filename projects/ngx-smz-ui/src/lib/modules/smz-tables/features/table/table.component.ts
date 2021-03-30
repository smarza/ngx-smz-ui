import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef } from '@angular/core'
import { PrimeTemplate } from 'primeng/api';
import { SmzContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableConfig, SmzTableContext } from '../../models/table-config';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmzTableComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public items: any[] = [];
  @Input() public config: SmzTableConfig;
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  public contentTemplate: TemplateRef<any>;
  public actionsTemplate: TemplateRef<any>;
  public captionTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public emptyActionsTemplate: TemplateRef<any>;
  public emptyConfigTemplate: TemplateRef<any>;
  public selectedItems: any[];
  public clonedItems: any[] = [];
  public contentTypes = {
    currency: `${SmzContentType.CURRENCY}`,
    calendar: `${SmzContentType.CALENDAR}`,
    icon: `${SmzContentType.ICON}`,
    text: `${SmzContentType.TEXT}`,
  }
  public filterTypes = {
    boolean: SmzFilterType.BOOLEAN,
    date: SmzFilterType.DATE,
    numeric: SmzFilterType.NUMERIC,
    text: SmzFilterType.TEXT,
    currency: SmzFilterType.CURRENCY,
    dropdown: SmzFilterType.DROPDOWN,
    multiselect: SmzFilterType.MULTI_SELECT
  }

  constructor(public cdr: ChangeDetectorRef) {

  }

  public ngOnInit(): void {

  }
  public ngOnChanges(changes: SimpleChanges): void
  {
      console.log(changes);
      if (changes.items != null)
      {
        if (changes.items.currentValue != null)
        {
          this.clonedItems = cloneDeep(changes.items.currentValue);
        }
        else
        {
          this.clonedItems = [];
        }

        this.cdr.markForCheck();
      }

      if (changes.config != null)
      {

        const config: SmzTableConfig = changes.config.currentValue;

        if (config != null)
        {
          if (!config.isSelectable) {
            this.selectedItems = [];
          }
        }
        else
        {
          this.selectedItems = [];
        }

        this.cdr.markForCheck();
      }
  }
  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'actions':
          this.actionsTemplate = item.template;
          break;

        case 'caption':
          this.captionTemplate = item.template;
          break;

        case 'toolbar':
          this.toolbarTemplate = item.template;
          break;

        case 'emptyActions':
          this.emptyActionsTemplate = item.template;
          break;

        case 'emptyConfig':
          this.emptyConfigTemplate = item.template;
          break;
      }
    });

  }

  public clear(dt: any, context: SmzTableContext): void {
    dt.clear();

    if (context.config.clearFilterCallback != null) {
      context.config.clearFilterCallback();
    }
  }

}

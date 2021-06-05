import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core'
import { PrimeTemplate } from 'primeng/api';
import { SmzContentType } from '../../models/content-types';
import { SmzFilterType } from '../../models/filter-types';
import { SmzTableState, SmzTableContext } from '../../models/table-state';
import { SmzTableColumn } from '../../models/table-column';
import { SmzEditableType } from '../../models/editable-types';
import { TableEditableService } from '../../services/table-editable.service';

@Component({
  selector: 'smz-ui-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableEditableService]
})
export class SmzTableComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTableState;
  @Input() public items: any[] = [];
  @Input() public loading: boolean = false;
  @Output() public selectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() public save: EventEmitter<any> = new EventEmitter<any>();
  public contentTemplate: TemplateRef<any>;
  public editableTemplate: TemplateRef<any>;
  public actionsTemplate: TemplateRef<any>;
  public captionTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public emptyActionsTemplate: TemplateRef<any>;
  public emptyStateTemplate: TemplateRef<any>;
  public selectedItems: any[];
  public selectedColumns: SmzTableColumn[];
  public showSkeleton = false;
  public documentClickListener = null;
  public contentTypes = {
    currency: SmzContentType.CURRENCY,
    calendar: SmzContentType.CALENDAR,
    icon: SmzContentType.ICON,
    text: SmzContentType.TEXT,
    custom: SmzContentType.CUSTOM
  }
  public editableTypes = {
    none: SmzEditableType.NONE,
    custom: SmzEditableType.CUSTOM,
    calendar: SmzEditableType.CALENDAR,
    text: SmzEditableType.TEXT,
    area: SmzEditableType.AREA,
    dropdown: SmzEditableType.DROPDOWN,
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
  constructor(public cdr: ChangeDetectorRef, public editableService: TableEditableService) {
    this.editableService.cdr = this.cdr;
    this.editableService.saveEvent = this.save;
  }

  public ngOnInit(): void {
  }

  public bind(): void {
  }

  public updateColumnsVisibility(): void {
    this.state.columns.forEach(x => {
      x.isVisible = this.selectedColumns?.findIndex(c => c.field === x.field) !== -1;
    });

    this.state = { ...this.state };
  }
  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.state != null) {

      const newState: SmzTableState = changes.state.currentValue;

      if (newState != null) {
        if (!newState.caption?.rowSelection?.isButtonVisible) {
          this.selectedItems = [];
        }
      }
      else {
        this.selectedItems = [];
      }

      this.populateColumnVisibility(newState);

      this.editableService.state = this.state;

      this.cdr.markForCheck();
    }

  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'editable':
          this.editableTemplate = item.template;
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

        case 'emptyState':
          this.emptyStateTemplate = item.template;
          break;
      }
    });
  }

  public populateColumnVisibility(newState: SmzTableState): void {
    this.selectedColumns = newState?.columns.filter(x => x.isVisible) ?? [];
  }

  public clear(dt: any, context: SmzTableContext): void {
    dt.clear();

    if (context.state.caption?.clearFilters?.callback != null) {
      context.state.caption.clearFilters.callback();
    }
  }

  public onRowSelection(context: SmzTableContext): void {
    context.state.caption.rowSelection.isEnabled = !context.state.caption.rowSelection.isEnabled;

    if (context.state.caption.rowSelection.callback != null) {
      context.state.caption.rowSelection.callback();
    }
  }

}

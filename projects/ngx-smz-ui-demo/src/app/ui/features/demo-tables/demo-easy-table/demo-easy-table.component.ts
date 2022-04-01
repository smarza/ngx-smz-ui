import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzEasyTableState, SmzEasyTableContentType, SmzEasyTableTextContent, SmzEasyTableActionContent, ApplicationActions, SmzEasyTableCustomContent, SmzEasyTableCalendarContent, SmzEasyTableDataTransformContent, SmzEasyTableBuilder } from 'ngx-smz-ui';
import { DemoTableDataService } from '../data-service/demo-tables-data-service';
import { Select, Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { DemoFeatureActions } from '@states/demo/demo.actions'
import { EasyTableDemoData } from './easy-table-model';


@Component({
  selector: 'app-demo-easy-table',
  templateUrl: './demo-easy-table.component.html',
  providers: [DemoTableDataService]
})

export class DemoEasyTableComponent implements OnInit, OnDestroy {
  @Select(DemoFeatureSelectors.allEasyTable) public items$: Observable<EasyTableDemoData[]>;
  // public state: SmzEasyTableState = mockState;
  public state: SmzEasyTableState = this.setupState();
  public timer;
  constructor(private store: Store) {

    this.store.dispatch(new ApplicationActions.StartGlobalLoading);

    setTimeout(() => {

      this.store.dispatch(new DemoFeatureActions.LoadAllEasyTableDemo());

      this.store.dispatch(new ApplicationActions.StopGlobalLoading);

      setTimeout(() => {

        this.store.dispatch(new DemoFeatureActions.LoadAllEasyTableDemo());

        this.timer = setInterval(() => {
          this.store.dispatch(new DemoFeatureActions.LoadAllEasyTableDemo());
        }, 10000);

      }, 2000);

    }, 1000);

  }

  public ngOnInit(): void {
  }

  public setupState(): SmzEasyTableState {

    return new SmzEasyTableBuilder()
      .debugMode()
      .setTitle('Your Orders')
      .setLocale('en-US')
      .menu()
        .item('Log')
          .setCallback((item) => console.log(item))
          .menu
        .table
      .columns()
        .text('No.', 'number')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 text-gray-700 whitespace-nowrap text-center')
          .useSort('desc')
          .setWidth('col-1')
          .columns
        .custom('Details', 'details', 'details')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 text-gray-700')
          .setWidth('col-6')
          .columns
        .text('Country', 'country.name')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 text-gray-700 whitespace-nowrap')
          .useSort('asc')
          .setWidth('col-1')
          .columns
        .dataTransform('Status', 'status')
          .setCallback((data: { id: string, name: string, background: string }, row, index) => { return `<div class="px-3 py-1 text-sm text-slate-800 rounded text-center ${data.background}"><strong>${data.name}</strong></div>` })
          .setSearchAndSortDataPath('status.name')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 whitespace-nowrap')
          .useSort('asc')
          .setWidth('col-1')
          .columns
        .date('Date', 'date')
          .setDateFormat('short')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 text-gray-700 whitespace-nowrap')
          .setWidth('col-1')
          .columns
        .text('Total', 'total')
          .setHeaderStyles('p-3 text-sm font-semibold tracking-wide text-left')
          .setCellStyles('p-3 text-gray-700 whitespace-nowrap')
          .setWidth('col-1')
          .columns
        .table
      .build();
  }

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}

const mockState: SmzEasyTableState = {
  isDebug: false,
  title: { isVisible: true, getText: () => 'Your Orders' },
  locale: {
    code: 'en-US',
    globalSearch: {
      placeholder: 'Global Search'
    },
    paginator: {
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'Results',
    },
    emptyMessage: 'Lista Vazia',
  },
  desktop: {
    enabled: true,
    containerStyleClass: 'overflow-auto rounded-lg shadow hidden md:block',
    tableStyleClass: 'w-full',
    layout: 'auto',
    head: {
      styleClass: 'bg-gray-50 border-b-2 border-gray-200',
      sortMode: 'multiple',
      visibleCount: 7,
      headers: [
        { isVisible: true, label: 'No.', key: 'number', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'number', sortPath: 'number', sort: { isActive: true, order: -1 } },
        { isVisible: true, label: 'Details', key: 'details', widthClass: 'col-6', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'details', sortPath: '', sort: null },
        { isVisible: true, label: 'Country', key: 'country', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'country.name', sortPath: 'country.name', sort: { isActive: false, order: -1 } },
        { isVisible: true, label: 'Status', key: 'status', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'name', sortPath: '', sort: null },
        { isVisible: true, label: 'Date', key: 'date', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'date', sortPath: '', sort: null },
        { isVisible: true, label: 'Total', key: 'total', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: 'total', sortPath: '', sort: null },
        { isVisible: true, label: 'Actions', key: 'actions', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', searchPath: '', sortPath: '', sort: null },
      ]
    },
    body: {
      styleClass: 'divide-y divide-gray-100',
      evenRow: {
        styleClass: 'bg-white'
      },
      oddRow: {
        styleClass: 'bg-gray-50'
      },
      columns: [
        {
          key: 'number',
          isVisible: true,
          styleClass: 'p-3 text-gray-700 whitespace-nowrap text-center',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'number',
          } as SmzEasyTableTextContent
        },
        {
          key: 'details',
          isVisible: true,
          styleClass: 'p-3 text-gray-700',
          content: {
            type: SmzEasyTableContentType.CUSTOM,
            dataPath: 'details',
            searchPath: '',
          } as SmzEasyTableCustomContent
        },
        {
          key: 'country',
          isVisible: true,
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'country.name',
          } as SmzEasyTableTextContent
        },
        {
          key: 'status',
          isVisible: true,
          styleClass: 'p-3 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.DATA_TRANSFORM,
            dataPath: 'status',
            searchPath: 'name',
            styleClass: '',
            callback: (data: { id: string, name: string, background: string }, row, index) => { return `<div class="px-3 py-1 text-sm text-slate-800 rounded text-center ${data.background}"><strong>${data.name}</strong></div>` }
          } as SmzEasyTableDataTransformContent
        },
        {
          key: 'date',
          isVisible: true,
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.CALENDAR,
            dataPath: 'date',
            format: 'short'
          } as SmzEasyTableCalendarContent
        },
        {
          key: 'total',
          isVisible: true,
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'total',
          } as SmzEasyTableTextContent
        },
        {
          key: 'actions',
          isVisible: true,
          styleClass: 'p-3 whitespace-nowrap text-center',
          content: {
            type: SmzEasyTableContentType.ACTION,
            items: [
              { label: 'New', icon: 'pi pi-fw pi-plus' },
              { label: 'Open', icon: 'pi pi-fw pi-download' },
              { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
            ]
          } as SmzEasyTableActionContent
        },
      ]
    }
  },
  mobile: {
    enabled: true,
    head: null,
    body: null
  },
  paginator: {
    itemsPerPage: 6,
    maxVisiblePages: 6
  },
  globalSearch: {
    isEnabled: true
  }
}
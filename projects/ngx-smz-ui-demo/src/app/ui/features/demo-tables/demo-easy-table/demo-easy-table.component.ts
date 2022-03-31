import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzEasyTableState, SmzEasyTableContentType, SmzEasyTableTextContent, SmzEasyTableActionContent, ApplicationActions, SmzEasyTableCustomContent, SmzEasyTableCalendarContent, SmzEasyTableDataTransformContent } from 'ngx-smz-ui';
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
  public state: SmzEasyTableState = mockState;
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

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}

const mockState: SmzEasyTableState = {
  isDebug: false,
  title: 'Your Orders',
  emptyMessage: 'Lista Vazia',
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
    }
  },
  desktop: {
    enabled: true,
    containerStyleClass: 'overflow-auto rounded-lg shadow hidden md:block',
    tableStyleClass: 'w-full',
    layout: 'auto',
    head: {
      styleClass: 'bg-gray-50 border-b-2 border-gray-200',
      sortMode: 'multiple',
      headers: [
        { label: 'No.', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: { isActive: true, order: -1, dataPath: 'number' } },
        { label: 'Details', widthClass: 'col-6', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: null },
        { label: 'Country', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: { isActive: false, order: -1, dataPath: 'country.name' } },
        { label: 'Status', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: null },
        { label: 'Date', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: null },
        { label: 'Total', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: null },
        { label: 'Actions', widthClass: 'col-1', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left', sort: null },
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
          styleClass: 'p-3 text-gray-700 whitespace-nowrap text-center',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'number',
          } as SmzEasyTableTextContent
        },
        {
          key: 'details',
          styleClass: 'p-3 text-gray-700',
          content: {
            type: SmzEasyTableContentType.CUSTOM,
            dataPath: 'details',
            searchPath: '',
          } as SmzEasyTableCustomContent
        },
        {
          key: 'country',
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'country.name',
          } as SmzEasyTableTextContent
        },
        {
          key: 'status',
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
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.CALENDAR,
            dataPath: 'date',
            format: 'short'
          } as SmzEasyTableCalendarContent
        },
        {
          key: 'total',
          styleClass: 'p-3 text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'total',
          } as SmzEasyTableTextContent
        },
        {
          key: 'actions',
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
  }
}
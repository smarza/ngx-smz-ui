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
        }, 5000);

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
  title: 'Your Orders',
  emptyMessage: 'Lista Vazia',
  locale: {
    code: 'pt-BR',
    globalSearch: {
      placeholder: 'Pesquisa Global'
    }
  },
  desktop: {
    enabled: true,
    containerStyleClass: 'overflow-auto rounded-lg shadow hidden md:block',
    tableStyleClass: 'w-full',
    layout: 'auto',
    head: {
      styleClass: 'bg-gray-50 border-b-2 border-gray-200',
      headers: [
        { label: 'No.', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Details', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Country', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Status', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Date', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Total', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Actions', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
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
    maxVisiblePages: 6,
    labels: {
      previous: 'Previous',
      next: 'Next',
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'Results',
    }
  }
}
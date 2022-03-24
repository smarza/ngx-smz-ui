import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzEasyTableState, SmzEasyTableContentType, SmzEasyTableTextContent, SmzEasyTableActionContent } from 'ngx-smz-ui';
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

    setTimeout(() => {

      this.store.dispatch(new DemoFeatureActions.LoadAllEasyTableDemo());

      setTimeout(() => {

        this.timer = setInterval(() => {
          this.store.dispatch(new DemoFeatureActions.LoadAllEasyTableDemo());
        }, 250);

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
  desktop: {
    enabled: true,
    containerStyleClass: 'overflow-auto rounded-lg shadow hidden md:block',
    tableStyleClass: 'w-full',
    head: {
      styleClass: 'bg-gray-50 border-b-2 border-gray-200',
      headers: [
        { label: 'No.', widthClass: 'w-20', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Details', widthClass: '', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Status', widthClass: 'w-24', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Date', widthClass: 'w-24', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Total', widthClass: 'w-32', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
        { label: 'Actions', widthClass: 'w-24', styleClass: 'p-3 text-sm font-semibold tracking-wide text-left' },
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
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'number',
          } as SmzEasyTableTextContent
        },
        {
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'details',
          } as SmzEasyTableTextContent
        },
        {
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'status.name',
          } as SmzEasyTableTextContent
        },
        {
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'date',
          } as SmzEasyTableTextContent
        },
        {
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
          content: {
            type: SmzEasyTableContentType.TEXT,
            dataPath: 'total',
          } as SmzEasyTableTextContent
        },
        {
          styleClass: 'p-3 text-sm text-gray-700 whitespace-nowrap',
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
}
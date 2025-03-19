import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmzTableState, SmzFilterType, SmzTableBuilder } from 'ngx-smz-ui';
import { DemoTableDataService } from '../data-service/demo-tables-data-service';
import { Select, Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { DemoItem } from '@models/demo';
import { DemoFeatureActions } from '@states/demo/demo.actions'
import { SimpleNamedEntity } from 'ngx-smz-ui';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-demo-signalr-table',
    templateUrl: './demo-signalr-table.component.html',
    providers: [DemoTableDataService],
    standalone: false
})

export class DemoSignalRTableComponent implements OnInit, OnDestroy {
  @Select(DemoFeatureSelectors.all) public items$: Observable<DemoItem[]>;
  public items = getNewData();
  private _subjects$: BehaviorSubject<DemoItem[]> = new BehaviorSubject([]);
  public subjects$ = this._subjects$.asObservable();
  public tableState: SmzTableState = this.buildTableState();
  public timer;
  public isSmzTable = true;
  public menuItems: MenuItem[];
  constructor(private store: Store) {

    this.store.dispatch(new DemoFeatureActions.LoadAllSignalRDemo());

    // this.store
    //   .select(DemoFeatureSelectors.all)
    //   .subscribe((data) => {
    //     this._subjects$.next(data);
    //   })

    this.menuItems = [{
      label: 'Options',
      items: [{
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {

        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {

        }
      }
      ]
    },
    {
      label: 'Navigate',
      items: [{
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
      }
      ]
    }
    ];

    this.timer = setInterval(() => {
      this.store.dispatch(new DemoFeatureActions.LoadAllSignalRDemo());
      // this._subjects$.next(getNewData())
      // updateData(this.items);
    }, 5000);
  }

  public ngOnInit(): void {
  }

  public buildTableState(): SmzTableState {
    return new SmzTableBuilder()
      .setTitle('SignalR Demo')
      .enableClearFilters()
      .enableColumnVisibility()
      .useStrippedStyle()
      .menu()
        .item('Consultar')
          .setCallback((event: any) => console.log('---'))
          .menu
        .table
      .columns()
        .text('name', 'Name')
          .disableFilter()
          .columns
        .text('country.name', 'Country')
          .setFilter(SmzFilterType.MULTI_SELECT)
          .disableSort()
          .columns
        .text('sample', 'Amostragem')
          .columns
        .table
      .build();
  }

  public ngOnDestroy(): void {
    clearInterval(this.timer);
  }

}

const initialData = [
  { id: '1', name: 'Bruce Wayne', country: { id: 'united-kingdom', name: 'United Kingdom' }, sample: 0 },
  { id: '2', name: 'Tony Stark', country: { id: 'canada', name: 'Canada' }, sample: 0 },
  { id: '3', name: 'Coyote', country: { id: 'brazil', name: 'Brazil' }, sample: 0 },
];

function getNewData(): any[] {
  return initialData.map(item => ({ ...item, sample: Math.floor(Math.random() * 100) + 1 }))
}

function updateData(data: any[]): void {
  data.forEach(item => {
    item.sample = Math.floor(Math.random() * 100) + 1;
  });
}
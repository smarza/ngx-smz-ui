import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { removeElementFromArray } from '../../../common/utils/utils';
import { SmzEasyTableState } from '../models/smz-easy-table-state';
import { SmzEasyTableData, SmzEasyTableViewport } from '../models/smz-easy-table-data';
import moment from 'moment';
import { paginator } from './table-data-utils';

@Injectable()
export class TableDataSourceService {
  public viewport: SmzEasyTableViewport = { original: [], allTableData: [], paginator: null };
  public state: SmzEasyTableState;
  public source$: Observable<any[]>;
  public subscription: Subscription;
  public cdr: ChangeDetectorRef;

  constructor() {

  }

  public setupListener(): void {

    if (this.source$ != null) {

      this.subscription = this.source$
        .subscribe(data => {

          console.group('subscription');
          console.log('newData', data);


          const newData = data ?? [];
          this.viewport.original = newData;

          newData.forEach(newItem => {
            const newTableItem = this.createTableData(newItem);
            this.viewport.allTableData.push(newTableItem);
          });

          this.cdr.markForCheck();

          this.viewport.paginator = paginator(this.viewport.allTableData, 1, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);


          console.log('paginator', this.viewport.paginator);
          console.groupEnd();
        });

    }
  }

  public createTableData(item: any): SmzEasyTableData {
    return {
      id: item.id,
      0: `<b>${item.number}</b>`,
      1: item.details,
      2: item.status.name,
      3: moment(item.date).calendar().toString(),
      4: item.total
    };
  }

  public updateTableData(item: any, updateData: any): void {

    item[0] = `<b>${updateData.number}</b>`;
    item[1] = updateData.details;
    item[2] = updateData.status.name;
    item[3] = moment(updateData.date).calendar().toString();
    item[4] = updateData.total;

  }

  public disconnect(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}

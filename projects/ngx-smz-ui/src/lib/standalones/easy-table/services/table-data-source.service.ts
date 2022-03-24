import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { cloneDeep } from 'lodash';
import { removeElementFromArray } from '../../../common/utils/utils';
import { SmzEasyTableState } from '../models/smz-easy-table-state';
import { SmzEasyTableData } from '../models/smz-easy-table-data';
import moment from 'moment';

@Injectable()
export class TableDataSourceService {
  public data: { showSkeleton: boolean, items: SmzEasyTableData[] } = { showSkeleton: true, items: [] };
  public viewport: { original: any[], items: SmzEasyTableData[] } = { original: [], items: [] };
  public state: SmzEasyTableState;
  public source$: Observable<any[]>;
  public subscription: Subscription;
  public cdr: ChangeDetectorRef;

  constructor() {

  }

  public setupListener(): void {
    if (this.source$ != null) {

      this.subscription = this.source$
        .subscribe(newItems => {
          console.log('from TableDataSourceService subscription', newItems);

          const itemsToRemove: any[] = [];
          const itemsToAdd: any[] = [];

          const showSkeleton = newItems == null;
          this.data.showSkeleton = showSkeleton;

          if (newItems == null) {
            this.data.items = [];
            this.cdr.markForCheck();
            return;
          }

          this.viewport.items.forEach((item, index) => {

            const matchIndex = newItems.findIndex(x => x.id === item.id);

            if (matchIndex !== -1) {
              // Encontrou item nas duas listas
              console.log('   >> updating', item.details);

              // this.data.items[index] = { ...newItems[matchIndex] };
              this.updateData(item, newItems[matchIndex]);
            }
            else {
              // Item antigo foi removido
              itemsToRemove.push(cloneDeep(item));
            }
          });

          newItems.forEach((newItem, index) => {

            const match = this.data.items.some(x => x.id === newItem.id);

            if (!match) {
              // Item novo detectado
              itemsToAdd.push(cloneDeep(newItem));
            }

          });

          if (itemsToRemove.length > 0) {
            console.log('Items antigos não existentes na lista nova: ', itemsToRemove);
            itemsToRemove.forEach(x => {
              removeElementFromArray(this.data.items, x, 'id');
              removeElementFromArray(this.viewport.items, x, 'id')
            });
          }

          if (itemsToAdd.length > 0) {
            console.log('Items novo não existentes na lista antiga: ', itemsToAdd);
            itemsToAdd.forEach(x => {
              this.data.items.push(cloneDeep(x));
              this.viewport.items.push(this.convertData(x));
            });
          }

          this.cdr.markForCheck();

          // console.log('   >> results', this.viewport.items);

        });

    }
  }

  public convertData(item: any): SmzEasyTableData {
    return {
      id: item.id,
      0: `<b>${item.number}</b>`,
      1: item.details,
      2: item.status.name,
      3: moment(item.date).calendar().toString(),
      4: item.total
    };
  }

  public updateData(item: any, updateData: any): void {

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

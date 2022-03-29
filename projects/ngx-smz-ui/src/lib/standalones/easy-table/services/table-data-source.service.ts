import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SmzEasyTableState } from '../models/smz-easy-table-state';
import { SmzEasyTableData, SmzEasyTableViewport } from '../models/smz-easy-table-data';
import moment from 'moment';
import { paginator } from './table-data-utils';
import { ObjectUtils } from 'primeng/utils';
import { SmzEasyTableContentType } from '../models/smz-easy-table-contents';

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

          // console.groupCollapsed('subscription');
          // console.log('newData', data);

          const newData = data ?? [];
          this.viewport.original = newData;

          this.viewport.allTableData = [];

          newData.forEach(newItem => {
            const newTableItem = this.createTableData(newItem);
            this.viewport.allTableData.push(newTableItem);
          });

          const currentPage = this.viewport.paginator?.page ?? 1;
          const currentPageItems = this.viewport.paginator?.data.length > 0 ? this.viewport.paginator?.data : null;

          this.viewport.paginator = paginator(this.viewport.allTableData, currentPage, currentPageItems, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);

          this.cdr.markForCheck();

          // console.log('paginator', this.viewport.paginator);
          // console.groupEnd();
        });

    }
  }

  public createTableData(item: any): SmzEasyTableData {

    const result = {};

    this.state.desktop.body.columns.forEach((column, i) => {

      switch (column.content.type) {
        case SmzEasyTableContentType.TEXT:
          result[i] = ObjectUtils.resolveFieldData(item, column.content.dataPath);
          break;

        case SmzEasyTableContentType.CALENDAR:
          result[i] = ObjectUtils.resolveFieldData(item, column.content.dataPath);
          break;

        case SmzEasyTableContentType.CUSTOM:
          result[i] = ObjectUtils.resolveFieldData(item, column.content.dataPath);
          break;

        case SmzEasyTableContentType.DATA_TRANSFORM:
          result[i] = ObjectUtils.resolveFieldData(item, column.content.dataPath);
          break;

        default:
          result[i] = '-';
          break;
      }

    })

    return {
      id: item.id,
      ...result,
    };
  }

  public updateTableData(item: any, updateData: any): void {

    this.state.desktop.body.columns.forEach((column, i) => {

      switch (column.content.type) {
        case SmzEasyTableContentType.TEXT:
          item[i] = ObjectUtils.resolveFieldData(updateData, column.content.dataPath);
          break;

        case SmzEasyTableContentType.CALENDAR:
          item[i] = ObjectUtils.resolveFieldData(updateData, column.content.dataPath);
          break;

        case SmzEasyTableContentType.TEXT:
          item[i] = ObjectUtils.resolveFieldData(updateData, column.content.dataPath);
          break;

        case SmzEasyTableContentType.DATA_TRANSFORM:
            item[i] = ObjectUtils.resolveFieldData(updateData, column.content.dataPath);
            break;

        default:
          item[i] = '-';
          break;
      }

    })

  }

  public disconnect(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
}

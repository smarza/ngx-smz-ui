import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SmzEasyTableState } from '../models/smz-easy-table-state';
import { GlobalSearchData, SmzEasyTableData, SmzEasyTableViewport } from '../models/smz-easy-table-data';
import { paginator } from './table-data-utils';
import { ObjectUtils } from 'primeng/utils';
import { SmzEasyTableContentType } from '../models/smz-easy-table-contents';
import { cloneDeep, isEmpty } from 'lodash-es';
import { formatDate } from '@angular/common';

@Injectable()
export class TableDataSourceService {
  public viewport: SmzEasyTableViewport = {
    original: [],
    allTableData: [],
    tableData: [],
    search: { globalSearchData: [] },
    paginator: {
      page: null,
      perPage: null,
      prePage: null,
      nextPage: null,
      total: null,
      totalPages: null,
      maxVisiblePages: null,
      showing: null,
      to: null,
      pages: [],
      data: []
    }
  };
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
          const newData = data ?? [];

          this.viewport.original = newData;

          this.viewport.allTableData = [];
          this.viewport.search.globalSearchData = [];

          newData.forEach(newItem => {
            const tableData = this.createTableData(newItem);
            this.viewport.allTableData.push(tableData);
            this.viewport.search.globalSearchData.push(this.createGlobalSearchData(cloneDeep(tableData)));
          });

          // this.viewport.tableData = cloneDeep(this.viewport.allTableData);

          this.executeGlobalSearch(this.viewport.search.searchValue, false, true);

          this.cdr.markForCheck();

          console.log('viewport', this.viewport);
        });

    }
  }

  public executeGlobalSearch(value: string, resetPagination: boolean, preserveCurrentItems: boolean): void {

    this.viewport.search.searchValue = value;

    if (isEmpty(value)) {
      this.viewport.tableData = this.viewport.allTableData;
      this.createPaginator(resetPagination ? 1 : (this.viewport.paginator?.page ?? 1), preserveCurrentItems);
    }
    else {

      const words = value.toLocaleLowerCase().replace(/\s+/g, ' ').trim().split(' ');

      let matchs = this.viewport.search.globalSearchData;

      words.forEach(word => {
        matchs = matchs.filter(x => x.searchData.toLocaleLowerCase().includes(word));
      });

      const newTableData = matchs.map(x => x.item);

      this.viewport.tableData = newTableData;
      this.createPaginator(resetPagination ? 1 : this.viewport.paginator.page, preserveCurrentItems);
    }

    this.cdr.markForCheck();
  }

  public createPaginator(currentPage: number, preserveCurrentItems: boolean): void {
    const currentPageItems = this.viewport.paginator?.data.length > 0 ? this.viewport.paginator?.data : null;
    this.viewport.paginator = paginator(this.viewport.tableData, currentPage, preserveCurrentItems ? currentPageItems : null, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);
  }

  public updatePaginator(currentPage: number, preserveCurrentItems: boolean): void {
    const currentPageItems = this.viewport.paginator?.data.length > 0 ? this.viewport.paginator?.data : null;
    const paginatorData = paginator(this.viewport.tableData, currentPage, preserveCurrentItems ? currentPageItems : null, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);

    this.viewport.paginator.data = paginatorData.data;
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

    });

    return {
      id: item.id,
      ...result,
    };
  }

  public createGlobalSearchData(item: SmzEasyTableData): GlobalSearchData {

    let searchData = '';

    this.state.desktop.body.columns.forEach((column, i) => {

      switch (column.content.type) {
        case SmzEasyTableContentType.TEXT:
          searchData += `${item[i]}`.toLowerCase();
          break;

        case SmzEasyTableContentType.CALENDAR:
          searchData += `${formatDate(item[i], column.content.format, this.state.locale.code)}`.toLowerCase();
          break;

        case SmzEasyTableContentType.CUSTOM:
          const customResolve = ObjectUtils.resolveFieldData(item[i], column.content.searchPath);
          searchData += `${customResolve ?? item[i]}`.toLowerCase();
          break;

        case SmzEasyTableContentType.DATA_TRANSFORM:
          const transformResolve = ObjectUtils.resolveFieldData(item[i], column.content.searchPath);
          searchData += `${transformResolve ?? item[i]}`.toLowerCase();
          break;
      }

    });

    return {
      id: item.id,
      searchData,
      item
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

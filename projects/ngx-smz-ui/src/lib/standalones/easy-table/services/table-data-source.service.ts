import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription, BehaviorSubject, throttle, interval, throttleTime } from 'rxjs';
import { SmzEasyTableState } from '../models/smz-easy-table-state';
import { GlobalSearchData, SmzEasyTableData, SmzEasyTableViewport } from '../models/smz-easy-table-data';
import { paginator } from './table-data-utils';
import { ObjectUtils } from 'primeng/utils';
import { SmzEasyTableContentType } from '../models/smz-easy-table-contents';
import { cloneDeep, isEmpty } from 'lodash-es';
import { formatDate } from '@angular/common';
import { sortArrayOfObjects } from '../../../common/utils/utils';

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
  public sourceSubscription: Subscription;
  public internalSource$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  public internalSourceSubscription: Subscription;
  public cdr: ChangeDetectorRef;

  constructor() {
  }

  public setupListener(): void {

    if (this.source$ != null) {

      if (this.state.config.throttle.isEnabled) {
        this.sourceSubscription = this.source$
          .pipe(throttleTime(this.state.config.throttle.interval))
          .subscribe(data => this.processDataSource(data));
      }
      else {
        this.sourceSubscription = this.source$
        .subscribe(data => this.processDataSource(data));
      }

      this.internalSourceSubscription = this.internalSource$
        .subscribe(data => {
          if (data != null) {
            this.setupNewData(data, true);
          }
        });

    }
  }

  private processDataSource(data: any[]): void {
    if (this.state.isDebug) console.log('');
    if (this.state.isDebug) console.log('New Data ############################');
    const start = performance.now();

    this.setupNewData(data, false);

    const end = performance.now();
    if (this.state.isDebug) console.log(`     >>>> New data execution total time: ${end - start} ms`);

    if (this.state.config.throttle.method === 'auto') {
      // O próximo intervalo de segurança será com base em 120% do último tempo de preparação do dado.
      this.state.config.throttle.interval = (end - start) * (this.state.config.throttle.incrementPercentage / 100);
      if (this.state.isDebug) console.log(`     >>>> Throttle was updated to: ${this.state.config.throttle.interval} ms`);
    }
  }

  public setupNewData(data: any[], resetPagination: boolean): void {
    let sortedData = cloneDeep(data ?? []);

    const start = performance.now();

    this.state.desktop.head.headers.forEach(header => {
      if (header.sort != null && header.sort.isActive) {
        sortArrayOfObjects(sortedData, header.sortPath, header.sort.order);
      }
    });

    const end = performance.now();
    if (this.state.isDebug) console.log(`     > Sort execution time: ${end - start} ms`);

    const newData = sortedData;

    this.viewport.original = newData;

    this.viewport.allTableData = [];
    this.viewport.search.globalSearchData = [];

    newData.forEach(newItem => {
      const tableData = this.createTableData(newItem);
      this.viewport.allTableData.push(tableData);
      this.viewport.search.globalSearchData.push(this.createGlobalSearchData(cloneDeep(tableData)));
    });

    this.executeGlobalSearch(this.viewport.search.searchValue, resetPagination);

    this.cdr.markForCheck();
  }

  public executeGlobalSearch(value: string, resetPagination: boolean): void {

    const start = performance.now();

    this.viewport.search.searchValue = value;

    if (isEmpty(value)) {
      this.viewport.tableData = this.viewport.allTableData;
      this.createPaginator(resetPagination ? 1 : (this.viewport.paginator?.page ?? 1), !resetPagination);
    }
    else {

      const words = value.toLocaleLowerCase().replace(/\s+/g, ' ').trim().split(' ');

      let matchs = this.viewport.search.globalSearchData;

      words.forEach(word => {
        matchs = matchs.filter(x => x.searchData.toLocaleLowerCase().includes(word));
      });

      const newTableData = matchs.map(x => x.item);

      this.viewport.tableData = newTableData;
      this.createPaginator(resetPagination ? 1 : this.viewport.paginator.page, !resetPagination);
    }

    this.cdr.markForCheck();

    const end = performance.now();
    if (this.state.isDebug) console.log(`     > Global Search execution time: ${end - start} ms`);

    if (this.state.globalSearch.isOptimized) {
      // O próximo intervalo de segurança será com base em 120% do último tempo de preparação do dado.
      this.state.globalSearch.interval = (end - start) * (this.state.globalSearch.incrementPercentage / 100);
      if (this.state.isDebug) console.log(`     >>>> Global Search Optimization was updated to: ${this.state.globalSearch.interval} ms`);
    }

  }

  public createPaginator(currentPage: number, preserveCurrentItems: boolean): void {

    const currentPageItems = this.viewport.paginator.data.length > 0 ? this.viewport.paginator.data : null;

    const newPaginator = paginator(this.viewport.tableData, currentPage, null, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);

    const newDataHash = newPaginator.data.map(x => x[this.state.config.dataIdProperty]).join();
    const oldDataHash = this.viewport.paginator.data.map(x => x[this.state.config.dataIdProperty]).join();

    if (newDataHash !== oldDataHash) {
      // console.log(`${oldDataHash} !== ${newDataHash}`);
      // console.log('new data.........');
      this.viewport.paginator = newPaginator;
    }
    else {
      // console.log(`${oldDataHash} === ${newDataHash}`);
      this.viewport.paginator = paginator(this.viewport.tableData, currentPage, preserveCurrentItems ? currentPageItems : null, this.state.paginator.itemsPerPage, this.state.paginator.maxVisiblePages);
    }

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
      id: item[this.state.config.dataIdProperty],
      ...result,
    };
  }

  public createGlobalSearchData(item: SmzEasyTableData): GlobalSearchData {

    let searchData = '';

    this.state.desktop.body.columns.forEach((column, i) => {
      const searchPath = this.state.desktop.head.headers[i].searchPath;

      switch (column.content.type) {
        case SmzEasyTableContentType.TEXT:
          searchData += `${item[i]}`.toLowerCase();
          break;

        case SmzEasyTableContentType.CALENDAR:
          searchData += `${formatDate(item[i], column.content.format, this.state.locale.code)}`.toLowerCase();
          break;

        case SmzEasyTableContentType.CUSTOM:
          const customResolve = ObjectUtils.resolveFieldData(item[i], searchPath);
          searchData += `${customResolve ?? item[i]}`.toLowerCase();
          break;

        case SmzEasyTableContentType.DATA_TRANSFORM:
          const transformResolve = ObjectUtils.resolveFieldData(item[i], searchPath);
          searchData += `${transformResolve ?? item[i]}`.toLowerCase();
          break;
      }

    });

    return {
      id: item[this.state.config.dataIdProperty],
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
    if (this.sourceSubscription != null) {
      this.sourceSubscription.unsubscribe();
    }

    this.internalSourceSubscription.unsubscribe();
  }
}

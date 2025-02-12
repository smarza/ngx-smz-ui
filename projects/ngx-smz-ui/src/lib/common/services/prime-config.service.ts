import { Injectable } from '@angular/core';
import { FilterMatchMode, FilterService, PrimeNGConfig } from 'primeng/api';
import { SimpleNamedEntity } from '../models/simple-named-entity';
import { GlobalInjector } from './global-injector';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class PrimeConfigService {

  constructor(private filterUtils: FilterService, private config: PrimeNGConfig) { }
  public init(): void {
    this.filters();
    this.setFilterMatchModeOptions();
    this.setTranslation();
  }

  private filters(): void {

    this.filterUtils.register(FilterMatchMode.DATE_IS, (value: Date, filter: Date): boolean => {
      if (filter == null) {
        return true;
      }

      if (value == null) {
        return false;
      }

      const isTimeIgnored =
        filter.getHours() === 0 &&
        filter.getMinutes() === 0 &&
        filter.getSeconds() === 0;

    if (isTimeIgnored) {
      // Compara apenas a data (dia, mês, ano)
      return moment(value).isSame(filter, 'day');
    } else {
      // Compara a data completa (data e hora)
      return moment(value).isSame(filter, 'minute');
    }
    });

    this.filterUtils.register(FilterMatchMode.DATE_BEFORE, (value: Date, filter: Date): boolean => {
      if (filter == null) {
        return true;
      }

      if (value == null) {
        return false;
      }

      return value == null ? false : moment(value)?.isBefore(filter);
    });

    this.filterUtils.register(FilterMatchMode.DATE_AFTER, (value: Date, filter: Date): boolean => {
      if (filter == null) {
        return true;
      }

      if (value == null) {
        return false;
      }

      return value == null ? false : moment(value)?.isAfter(filter);
    });

    this.filterUtils.register(FilterMatchMode.DATE_IS_NOT, (value: Date, filter: Date): boolean => {
      if (filter == null) {
        return true;
      }

      if (value == null) {
        return false;
      }

      return value == null ? false : !moment(value)?.isSame(filter);
    });

    this.filterUtils.register('multiselectById', (value: string, filter: { id: string }[]): boolean => filter?.findIndex(x => x.id === value) > -1);
    this.filterUtils.register('multiselectByValue', (value: string, filter: { value: string }[]): boolean => filter?.findIndex(x => x.value === value) > -1);

    this.filterUtils.register('multiselectByString', (value: string, filter: string[]): boolean => (filter == null || filter?.length === 0 ? true : filter?.findIndex(x => x === value) > -1));

    this.filterUtils.register('dropdown', (value: string, filter: { value: string }[]): boolean => filter == null || Reflect.get(filter, 'id') === value );

    // register filter type for array items, when filter has one or more of values
    this.filterUtils.register('array-some', (value: SimpleNamedEntity[], filters: SimpleNamedEntity[]) => {
      // console.log('array-some', value, filters);
      if (filters === undefined || filters === null || filters.length === 0) {
          return true;
      }
      const results = value?.some(v => filters?.some(f => f.id === v.id));
      return results;
    });

    // register filter type for array items, when filter has every value
    this.filterUtils.register('array-every', (value: any[], filters) => {
      if (filters === undefined || filters === null || filters.length === 0) {
          return true;
      }

      return value.every(v => filters.includes(v));
    });
  }

  private setFilterMatchModeOptions(): void {
    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.CONTAINS,
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER
      ]
    };
  }

  private setTranslation(): void {

    this.config.setTranslation(GlobalInjector.config.locale.translation);
  }

}
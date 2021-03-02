import { Injectable } from '@angular/core';
import { FilterMatchMode, FilterService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

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

    this.filterUtils.register('multiselectById', (value: string, filter: { id: string }[]): boolean => filter.findIndex(x => x.id === value) > -1);
    this.filterUtils.register('multiselectByValue', (value: string, filter: { value: string }[]): boolean => filter.findIndex(x => x.value === value) > -1);
    this.filterUtils.register('dropdown', (value: string, filter: { value: string }[]): boolean => filter == null || Reflect.get(filter, 'id') === value );
  }

  private setFilterMatchModeOptions(): void {
    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
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
    this.config.setTranslation({
      accept: 'Sim',
      addRule: 'Adicionar Regra',
      after: 'Depois',
      apply: 'Aplicar',
      before: 'Antes',
      clear: 'Limpar',
      contains: 'Contem',
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesMin: ['D', 'S', 'T', 'Qua', 'Qui', 'Sex', 'Sa'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      endsWith: 'Termina com',
      equals: 'Igual',
      gt: 'Maior que',
      gte: 'Maior que ou igual a',
      is: 'É',
      isNot: 'Não é',
      lt: 'Menor que',
      lte: 'Menor que ou Igual a',
      matchAll: 'Combina com Todos',
      matchAny: 'Combina com qualquer',
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      notContains: 'Não contém',
      notEquals: 'Diferente',
      reject: 'Não',
      removeRule: 'Remover Regra',
      startsWith: 'Começa com',
      today: 'Hoje',
      weekHeader: 'Sem',
      dateIs: 'Igual a',
      dateAfter: 'Depois de',
      dateBefore: 'Anterior a',
      dateIsNot: 'Diferente de'
    });
  }

}
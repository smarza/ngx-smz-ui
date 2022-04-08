import { SmzEasyTableBuilder } from './state-builder';

export class SmzEasyTablePaginatorBuilder {
  constructor(private _tableBuilder: SmzEasyTableBuilder, itemsPerPage: number = 10) {
    this._tableBuilder._state.paginator.itemsPerPage = itemsPerPage;
  }

  public disable(): SmzEasyTablePaginatorBuilder {
    this._tableBuilder._state.paginator.isVisible = false;
    this._tableBuilder._state.paginator.itemsPerPage = 999999999;
    return this;
  }

  public hideResults(): SmzEasyTablePaginatorBuilder {
    this._tableBuilder._state.paginator.showResults = false;
    return this;
  }

  public setMaxVisiblePages(amount: number): SmzEasyTablePaginatorBuilder {
    this._tableBuilder._state.paginator.maxVisiblePages = amount;
    return this;
  }

  public get table(): SmzEasyTableBuilder {
    return this._tableBuilder;
  }

}

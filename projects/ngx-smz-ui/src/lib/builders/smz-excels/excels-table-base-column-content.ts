import { SmzExcelColumn } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzExcelsTableColumnsBuilder } from './excels-table-columns';


export class SmzExcelsTableBaseColumnContentBuilder<T> {

  protected that: T;
  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {

  }

  public test(): T {

    return this.that;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

export class SmzExcelsTableColumnContentTextBuilder extends SmzExcelsTableBaseColumnContentBuilder<SmzExcelsTableColumnContentTextBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super(_builder, _state);
  }

  public test(): SmzExcelsTableColumnContentTextBuilder {

    return this;
  }

}

export class SmzExcelsTableColumnContentNumberBuilder extends SmzExcelsTableBaseColumnContentBuilder<SmzExcelsTableColumnContentNumberBuilder> {
  protected that = this;

  constructor(protected _builder: SmzExcelsTableColumnsBuilder, protected _state: SmzExcelColumn) {
    super(_builder, _state);
  }

  public setFormat(format: string): SmzExcelsTableColumnContentNumberBuilder {
    this._state.dataFormat = format;
    return this;
  }

}

import { SmzExcelColumn } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzExcelsTableColumnsBuilder } from './excels-table-columns';


export class SmzExcelsTableColumnContentBuilder {


  constructor(private _builder: SmzExcelsTableColumnsBuilder, private _state: SmzExcelColumn) {

  }

  public test(): SmzExcelsTableColumnContentBuilder {

    return this;
  }

  public get column(): SmzExcelsTableColumnsBuilder {
    return this._builder;
  }

}

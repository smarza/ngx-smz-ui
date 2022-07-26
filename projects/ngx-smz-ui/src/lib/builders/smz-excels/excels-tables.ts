import { SmzExcelThemeDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzExcelsSheetsBuilder } from './excels-sheets';
import { SmzExcelsStylesBuilder } from './excels-styles';
import { SmzExcelsTableColumnsBuilder } from './excels-table-columns';

export class SmzExcelsTablesBuilder {


  constructor(private _builder: SmzExcelsSheetsBuilder, private _state: SmzExcelTableSheet) {

  }

  public setTheme(theme: SmzExcelThemeDefinitions): SmzExcelsTablesBuilder {
    this._state.theme = theme;
    return this;
  }

  public columns(): SmzExcelsTableColumnsBuilder {
    return new SmzExcelsTableColumnsBuilder(this, this._state);
  }

  public headerStyles(): SmzExcelsStylesBuilder<SmzExcelsTablesBuilder> {
    return new SmzExcelsStylesBuilder<SmzExcelsTablesBuilder>(this, this._state.header.style);
  }

  public get sheets(): SmzExcelsSheetsBuilder {
    return this._builder;
  }
}
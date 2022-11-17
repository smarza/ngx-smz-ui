import { SmzExcelColorDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelState, SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsBuilder } from './excels-builder';
import { SmzExcelsTablesBuilder } from './excels-tables';

export class SmzExcelsSheetsBuilder extends SmzBuilderUtilities<SmzExcelsSheetsBuilder> {

  protected that = this;

  constructor(private _builder: SmzExcelsBuilder, private _: SmzExcelState, private _state: SmzExcelTableSheet) {
    super();
  }

  public setColor(hexColor: string): SmzExcelsSheetsBuilder {
    this._state.tabColor = hexColor;
    return this;
  }

  public table(): SmzExcelsTablesBuilder {
    return new SmzExcelsTablesBuilder(this, this._, this._state);
  }

  public get excels(): SmzExcelsBuilder {
    return this._builder;
  }
}

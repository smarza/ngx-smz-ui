import { SmzExcelColorDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsBuilder } from './excels-builder';
import { SmzExcelsTablesBuilder } from './excels-tables';

export class SmzExcelsSheetsBuilder extends SmzBuilderUtilities<SmzExcelsSheetsBuilder> {

  protected that = this;

  constructor(private _builder: SmzExcelsBuilder, private _state: SmzExcelTableSheet) {
    super();
  }

  public setColor(tabColor: SmzExcelColorDefinitions): SmzExcelsSheetsBuilder {
    this._state.tabColor = tabColor;
    return this;
  }

  public table(): SmzExcelsTablesBuilder {
    return new SmzExcelsTablesBuilder(this, this._state);
  }

  public get excels(): SmzExcelsBuilder {
    return this._builder;
  }
}

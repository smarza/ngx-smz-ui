import { cloneDeep } from 'lodash-es';
import { ObjectUtils } from 'primeng/utils';
import { SmzExcelDataDefinitions, SmzExcelFontDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelColumn, SmzExcelTableSheet, SmzExcelWatermarkSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsTableColumnContentBuilder } from './excels-table-column-content';
import { SmzExcelsTablesBuilder } from './excels-tables';

export class SmzExcelsTableColumnsBuilder extends SmzBuilderUtilities<SmzExcelsTableColumnsBuilder> {

  protected that = this;
  private _dataProperties: string[] = [];
  private defaultColumn: SmzExcelColumn = {
    data: [],
    style: {
      font: SmzExcelFontDefinitions.Calibri,
      fontSize: 12,
      bold: false,
      italic: false,
    },
    dataType: SmzExcelDataDefinitions.Text,
    dataFormat: undefined,
    maxWidth: undefined
  };

  constructor(private _builder: SmzExcelsTablesBuilder, private _state: SmzExcelTableSheet) {
    super();
  }

  public text(header: string, dataPropertyPath: string, sort?: boolean): SmzExcelsTableColumnContentBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const text: SmzExcelColumn = {
      ...cloneDeep(this.defaultColumn),
      dataType: SmzExcelDataDefinitions.Text,
      dataFormat: undefined,
    };

    if (sort)
      this._sort();

    this._state.columns.push(text);

    return new SmzExcelsTableColumnContentBuilder(this, text);
  }

  public setData(items: any[]): SmzExcelsTableColumnsBuilder
  {

    if (this._dataProperties.length === 0) {
      throw new Error(`Excel Builder => You need to set at least one column before set the data.`);
    }

    this._dataProperties.forEach((propertyPath, index) => {
      this._state.columns[index].data = items
        .map(x => ObjectUtils.resolveFieldData(x, propertyPath))
    });

    return this;
  }

  private _sort(): void {
    this._state.shouldSort = true;
    this._state.shouldSort = true;
    this._state.matchCase = false;
    this._state.sortColumn = this._state.header.data.length;
  }

  public get table(): SmzExcelsTablesBuilder {
    return this._builder;
  }
}

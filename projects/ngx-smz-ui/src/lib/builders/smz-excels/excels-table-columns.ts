import { cloneDeep } from 'lodash-es';
import { ObjectUtils } from 'primeng/utils';
import { SmzExcelDataDefinitions, SmzExcelFontDefinitions, SmzExcelSortOrderDefinitions } from '../../modules/smz-excels/models/smz-excel-definitions';
import { SmzExcelColumn, SmzExcelTableSheet } from '../../modules/smz-excels/models/smz-excel-table';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzExcelsTableColumnBooleanBuilder, SmzExcelsTableColumnHyperlinkBuilder, SmzExcelsTableColumnNumberBuilder, SmzExcelsTableColumnTextBuilder } from './excels-table-base-column-content';
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

  public text(header: string, dataPropertyPath: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnTextBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    if (sort != null)
      this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnTextBuilder(this, column);
  }

  public number(header: string, dataPropertyPath: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnNumberBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    if (sort != null)
      this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnNumberBuilder(this, column);
  }

  public boolean(header: string, dataPropertyPath: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnBooleanBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    if (sort != null)
      this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnBooleanBuilder(this, column);
  }

  public hyperlink(header: string, dataPropertyPath: string, sort?: SmzExcelSortOrderDefinitions): SmzExcelsTableColumnHyperlinkBuilder {

    this._state.header.data.push(header);
    this._dataProperties.push(dataPropertyPath);

    const column: SmzExcelColumn = { ...cloneDeep(this.defaultColumn) };

    if (sort != null)
      this._sort(sort);

    this._state.columns.push(column);

    return new SmzExcelsTableColumnHyperlinkBuilder(this, column);
  }

  public setData(items: any[]): SmzExcelsTableColumnsBuilder
  {

    if (this._dataProperties.length === 0) {
      throw new Error(`Excel Builder => You need to set at least one column before set the data.`);
    }

    this._dataProperties.forEach((propertyPath, index) => {
      this._state.columns[index].data = items
        .map(x => ObjectUtils.resolveFieldData(x, propertyPath)?.toString() ?? '')
    });

    return this;
  }

  private _sort(order: SmzExcelSortOrderDefinitions): void {
    this._state.shouldSort = true;
    this._state.sortOrder = order;
    this._state.matchCase = false;
    this._state.sortColumn = this._state.header.data.length;
  }

  public get table(): SmzExcelsTablesBuilder {
    return this._builder;
  }
}
